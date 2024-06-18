data "aws_vpc" "default" {
  default = true
}

data "aws_subnet" "public_subnet_a" {
  vpc_id = data.aws_vpc.default.id

  filter {
    name   = "tag:Name"
    values = ["public_subnet_a"]
  }
}

data "aws_subnet" "public_subnet_c" {
  vpc_id = data.aws_vpc.default.id

  filter {
    name   = "tag:Name"
    values = ["public_subnet_c"]
  }
}