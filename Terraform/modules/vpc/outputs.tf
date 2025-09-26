output "vpc_id" {
  value = aws_vpc.this.id
}

output "cidr_block" {
  value = aws_vpc.this.cidr_block
}

output "subnet_public_id" {
  value = aws_subnet.public.id
}

output "subnet_public_a_id" {
  value = aws_subnet.public-a.id
}

output "subnet_private_id" {
  value = aws_subnet.private.id
}

output "subnet_private_a_id" {
  value = aws_subnet.private-a.id
}

output "subnet_public_ids" {
  value = [
    aws_subnet.public.id,
    aws_subnet.public-a.id
  ]
}

output "subnet_private_ids" {
  value = [
    aws_subnet.private.id,
    aws_subnet.private-a.id
  ]
}

output "subnet_ids" {
  value = [
    aws_subnet.public.id,
    aws_subnet.public-a.id,
    aws_subnet.private.id,
    aws_subnet.private-a.id
  ]
}