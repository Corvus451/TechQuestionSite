variable "region" {
  type = string
  default = "eu-central-1"
}

variable "project_name" {
  type = string
  default = "techquestionsite"
}

variable "bastion_key_name" {
  type = string
}

variable "bastion_key_path" {
  type = string
}

variable "db_username" {
  type = string
  default = "postgres"
  sensitive = true
}

variable "db_name" {
  type = string
}

variable "db_password" {
  type = string
  default = "postgres"
  sensitive = true
}

# variable "aws_ecr_registry_name" {
#   type = string
# }

variable "aws_ecr_repository" {
  type = string
}

variable "aws_account_id" {
  type = string
}