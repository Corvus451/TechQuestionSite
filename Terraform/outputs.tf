output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "db_main_address" {
  value = module.database-main.database_address
}

output "db_auth_address" {
  value = module.database-auth.database_address
}

output "db_main_name" {
  value = module.database-main.db_name
}

output "db_auth_name" {
  value = module.database-auth.db_name
}

output "bastion_ip" {
  value = module.bastion.bastion_ip
}