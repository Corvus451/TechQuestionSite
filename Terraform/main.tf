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

module "database" {
  source = "./modules/database"
  project_name = var.project_name
  storage_size = 5
  db_username = var.db_username
  db_password = var.db_password
  vpc_id = module.vpc.vpc_id
  vpc_cidr = module.vpc.cidr_block
  subnet_private_ids = module.vpc.subnet_private_ids
  database_name = var.db_name
}

resource "terraform_data" "sql_init" {
  depends_on = [ module.database, module.bastion ]

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

  provisioner "remote-exec" {
    inline = [ "PGPASSWORD=${var.db_password} psql -h ${module.database.database_address} -U ${var.db_username} -d ${module.database.db_name} -f /home/ubuntu/init.sql" ]
  }
}

resource "aws_ecr_repository" "ecr" {
  name = var.aws_ecr_repository
}

resource "terraform_data" "push_apiserver_image" {
  depends_on = [ aws_ecr_repository.ecr ]

  provisioner "local-exec" {
    command = <<EOT
    aws ecr get-login-password --region ${var.region} | docker login --username AWS --password-stdin ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com
    docker build -t ${var.aws_ecr_repository}:latest ../APIServer
    docker tag ${var.aws_ecr_repository}:latest ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.aws_ecr_repository}:latest
    docker push ${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.aws_ecr_repository}:latest
    EOT

  }
}

module "pods" {
  source = "./modules/pods"
  depends_on = [ module.database, module.eks ]
  apiserver_replicas = 1
  apiserver_image = "${var.aws_account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.aws_ecr_repository}:latest"
  apiserver_port = 3000
  env_db_username = var.db_username
  env_db_password = var.db_password
  env_db_host = module.database.database_address
  env_db_port = 5432
  env_db_name = var.db_name
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
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = "apiserver-svc"
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