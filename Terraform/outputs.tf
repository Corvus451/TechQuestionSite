output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "db_address" {
  value = module.database.database_address
}

output "db_name" {
  value = module.database.db_name
}

output "bastion_ip" {
  value = module.bastion.bastion_ip
}