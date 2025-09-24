resource "aws_instance" "bastion" {
  ami                    = "ami-0a116fa7c861dd5f9"
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.bastion.id]
  key_name               = var.bastion_key_name
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update
              sudo apt install -y postgresql-client
              EOF

  # provisioner "remote-exec" {
  #   connection {
  #     type = "ssh"
  #     host = self.public_ip
  #     user = "ubuntu"
  #     private_key = file(var.bastion_key_path)
  #   }

  #   inline = [ "sudo apt update", "sudo apt install -y postgresql-client" ]
  # }

  tags = {
    Name = "${var.project_name}-bastion"
  }
}

resource "aws_security_group" "bastion" {
  vpc_id = aws_vpc.this.id
  name = "bastion"

  ingress {
    from_port = 0
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [ "0.0.0.0/0" ]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }

  tags = {
    Name = "${var.project_name}-bastion"
  }
}

output "bastion_ip" {
  value = aws_instance.bastion.public_ip
}