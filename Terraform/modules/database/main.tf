resource "aws_db_instance" "this" {
  identifier = "${var.project_name}-database"
  db_name = var.database_name
  allocated_storage = var.storage_size
  engine = "postgres"
  engine_version = "17.4"
  instance_class = "db.t4g.micro"
  username = var.db_username
  password = var.db_password
  skip_final_snapshot = true
  db_subnet_group_name = aws_db_subnet_group.this.name
  vpc_security_group_ids = [aws_security_group.db.id]
  multi_az = false //true if having errors
  publicly_accessible = false

}

resource "aws_security_group" "db" {
  vpc_id = var.vpc_id
  name = "${var.project_name}-db-sec-group"

  ingress {
    from_port = 5432
    to_port = 5432
    protocol = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "this" {
  name = "db-subnet-group"
  subnet_ids = var.subnet_private_ids

}