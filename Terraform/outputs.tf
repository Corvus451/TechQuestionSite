# output "cluster_endpoint" {
#   value = aws_eks_cluster.this.endpoint
# }

# output "database_endpoint" {
#   value = aws_db_instance.this.endpoint
# }

# Output the Ingress address (ALB URL)
# output "ingress_address" {
#   description = "The URL to access the pods via the ALB"
#   value       = try("http://${kubernetes_ingress_v1.ingress.status[0].load_balancer[0].ingress[0].hostname}", "Waiting for ALB to be provisioned")
# }

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