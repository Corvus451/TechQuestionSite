resource "aws_db_instance" "this" {
  identifier = "${var.project_name}-database"
  db_name = "${var.project_name}-db"
  allocated_storage = 5
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
  vpc_id = aws_vpc.this.id
  name = "${var.project_name}-db-sec-group"

  ingress {
    from_port = 5432
    to_port = 5432
    protocol = "tcp"
    cidr_blocks = [aws_vpc.this.cidr_block]
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
  subnet_ids = [ aws_subnet.private.id, aws_subnet.private-a.id ]

}

resource "terraform_data" "sql_init" {
  depends_on = [ aws_db_instance.this, aws_instance.bastion ]

  connection {
    type = "ssh"
    host = aws_instance.bastion.public_ip
    user = "ubuntu"
    private_key = file(var.bastion_key_path)
  }

  provisioner "remote-exec" {
    inline = [ "PGPASSWORD=${var.db_password} psql -h ${aws_db_instance.this.address} -U ${var.db_username} -d ${aws_db_instance.this.db_name} -f ../Database/init.sql" ]
  }
}