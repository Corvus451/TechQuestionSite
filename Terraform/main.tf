module "vpc" {
  source = "./modules/vpc"
  project_name = var.project_name
  region = var.region
}

module "eks" {
  source = "./modules/eks"
  vpc_id = module.vpc.vpc_id
  project_name = var.project_name
  region = var.region
  subnet_ids = module.vpc.subnet_ids
  subnet_private_ids = module.vpc.subnet_private_ids

}