variable "apiserver_replicas" {
  type = number
}

variable "apiserver_image" {
  type = string
}

variable "apiserver_port" {
  type = number
}

variable "env_db_username" {
  type = string
}

variable "env_db_password" {
  type = string
}

variable "env_db_host" {
  type = string
}

variable "env_db_name" {
  type = string
}

variable "env_db_port" {
  type = string
}