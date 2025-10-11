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

variable "db_password" {
  type = string
  default = "postgres"
  sensitive = true
}

variable "repository_main" {
  type = string
}

variable "repository_auth" {
  type = string
}

variable "aws_account_id" {
  type = string
}

variable "auth_endpoint" {
  type = string
  default = "/api/auth_v1"
}

variable "jwt_secret" {
  type = string
  sensitive = true
}

variable "jwt_expires_in" {
  type = string
}