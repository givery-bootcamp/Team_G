terraform {
  backend "s3" {
    bucket = "bootcamp-member-0005-config"
    key    = "tfstate/dena-team-7-2024.tfstate"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  region = "ap-northeast-1"

  default_tags {
    tags = {
      Name      = var.name
      Namespace = var.namespace
      Service   = var.service
      Terraform = true
    }
  }
}

module "dena_team_7_2024" {
  source = "./dena-team-7-2024"
}
