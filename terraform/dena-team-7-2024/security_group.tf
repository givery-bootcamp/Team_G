# # A managed resource "aws_security_group" "alb_sg" declared
data "aws_security_group" "alb_sg" {
  vpc_id = data.aws_vpc.default.id

  filter {
    name   = "group-name" # yuya神
    values = ["alb-security-group"]
  }
}