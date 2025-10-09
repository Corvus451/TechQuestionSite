variable "authserver_port" {
  type = number
}

variable "authserver_replicas" {
  type = number
}

variable "authserver_image" {
  type = string
}

variable "env_db_username" {
  type = string
}

variable "env_db_password" {
  type = string
}

variable "env_db_name" {
  type = string
}

variable "env_db_port" {
  type = string
}

variable "env_db_host" {
  type = string
}

variable "env_endpoint_prefix" {
  type = string
}

variable "env_jwt_secret" {
  type = string
}

variable "env_jwt_expires_in" {
  type = string
}