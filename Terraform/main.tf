module "vpc" {
  source = "./modules/vpc"
  project_name = var.project_name
  region = var.region
  cidr_block = "10.0.0.0/16"
}

module "eks" {
  source = "./modules/eks"
  vpc_id = module.vpc.vpc_id
  project_name = var.project_name
  region = var.region
  subnet_ids = module.vpc.subnet_ids
  subnet_private_ids = module.vpc.subnet_private_ids
  configure_kubectl = true
}

module "bastion" {
  source = "./modules/bastion"
  vpc_id = module.vpc.vpc_id
  subnet_public_id = module.vpc.subnet_public_id
  bastion_key_name = var.bastion_key_name
  project_name = var.project_name

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update
              sudo apt install -y postgresql-client
              EOF
}

module "database-main" {
  source = "./modules/database"
  identifier = "${var.project_name}-database"
  storage_size = 5
  db_username = var.db_username
  db_password = var.db_password
  database_name = "main"
  subnet_group_name = module.vpc.subnet_group_db_name
  security_group_id = module.vpc.security_group_db_id

}

module "database-auth" {
  source = "./modules/database"
  identifier = "${var.project_name}-database-auth"
  storage_size = 5
  db_username = var.db_username
  db_password = var.db_password
  database_name = "auth"
  subnet_group_name = aws_db_subnet_group.db.name
  security_group_id = aws_security_group.db.id
}

resource "terraform_data" "sql_init" {
  depends_on = [ module.database-main, module.database-auth, module.bastion ]

  connection {
    type = "ssh"
    host = module.bastion.bastion_ip
    user = "ubuntu"
    private_key = file(var.bastion_key_path)
  }

  provisioner "file" {
    source = "../Database/init.sql"
    destination = "/home/ubuntu/init.sql"
  }

  provisioner "file" {
    source = "../Database/init_auth.sql"
    destination = "/home/ubuntu/init_auth.sql"
  }

  provisioner "remote-exec" {
    inline = [
       "PGPASSWORD=${var.db_password} psql -h ${module.database-main.database_address} -U ${var.db_username} -d main -f /home/ubuntu/init.sql",
       "PGPASSWORD=${var.db_password} psql -h ${module.database-auth.database_address} -U ${var.db_username} -d auth -f /home/ubuntu/init_auth.sql"
    ]
  }
}

resource "aws_ecr_repository" "main" {
  name = var.repository_main
}

resource "aws_ecr_repository" "auth" {
  name = var.repository_auth
}

resource "terraform_data" "push_images" {
  depends_on = [ aws_ecr_repository.main, aws_ecr_repository.auth ]

  provisioner "local-exec" {
    command = <<EOT
    aws ecr get-login-password --region ${var.region} | docker login --username AWS --password-stdin ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com
    docker build -t ${var.repository_main}:latest ../APIServer
    docker tag ${var.repository_main}:latest ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.repository_main}:latest
    docker push ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.repository_main}:latest
    docker build -t ${var.repository_auth}:latest ../AuthServer
    docker tag ${var.repository_auth}:latest ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.repository_auth}:latest
    docker push ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.repository_auth}:latest
    EOT

  }
}

module "authserver" {
  source = "./modules/authserver"
  depends_on = [ module.database-main, module.database-auth, module.eks ]
  authserver_port = 3001
  authserver_replicas = 2
  authserver_image = "${aws_ecr_repository.auth}:latest"
  env_db_username = var.db_username
  env_db_password = var.db_password
  env_db_name = "auth"
  env_db_port = "5432"
  env_db_host = module.database-auth.database_address
  env_endpoint_prefix = var.auth_endpoint
  env_jwt_secret = var.jwt_secret
  env_jwt_expires_in = var.jwt_expires_in
}

module "apiserver" {
  source = "./modules/apiserver"
  depends_on = [ module.database-main, module.eks, module.authserver ]
  apiserver_replicas = 2
  apiserver_image = "${aws_ecr_repository.main.repository_url}:latest"
  apiserver_port = 3000
  env_db_username = var.db_username
  env_db_password = var.db_password
  env_db_host = module.database-main.database_address
  env_db_name = "main"
  env_db_port = "5432"
  env_auth_host = "${module.authserver.authserver_svc_name}:3001"
  env_auth_endpoint = var.auth_endpoint

}

resource "kubernetes_ingress_v1" "ingress" {
  metadata {
    name      = "tqs-ingress"
    namespace = "default"
    annotations = {
      "kubernetes.io/ingress.class"               = "alb"
      "alb.ingress.kubernetes.io/scheme"          = "internet-facing"
      "alb.ingress.kubernetes.io/target-type"     = "instance"
    #   "alb.ingress.kubernetes.io/target-group-attributes" = "stickiness.enabled=true,stickiness.lb_cookie.duration_seconds=86400"
    }
  }
  spec {
    rule {
      http {
        path {
          path      = "/api"
          path_type = "Prefix"
          backend {
            service {
              name = module.apiserver.apiserver_svc_name
              port {
                number = 3000
              }
            }
          }
        }
      }
    }
  }
  depends_on = [module.eks, module.pods]
}