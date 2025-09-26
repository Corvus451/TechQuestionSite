variable "project_name" {
  type = string
}

variable "storage_size" {
  type = number
}

variable "db_username" {
  type = string
}

variable "db_password" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "subnet_private_ids" {
  type = list(string)
}

variable "database_name" {
  type = string
}

