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
  database_name = "${var.project_name}db"
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