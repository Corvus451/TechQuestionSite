variable "region" {
  type = string
  default = "eu-central-1"
}

variable "project_name" {
  type = string
  default = "techquestionsite"
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