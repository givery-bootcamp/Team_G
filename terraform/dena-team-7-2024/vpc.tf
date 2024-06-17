# デフォルトVPCの取得
data "aws_vpc" "default" {
  default = true
}

data "aws_internet_gateway" "default" {
  filter {
    name   = "attachment.vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# ルートテーブルの作成
resource "aws_route_table" "private_route_table" {
  vpc_id = data.aws_vpc.default.id

	tags = {
		Name = "private_route_table"
	}
}

resource "aws_route_table" "public_route_table" {
  vpc_id = data.aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
		gateway_id = data.aws_internet_gateway.default.id
  }

	tags = {
		Name = "public_route_table"
	}
}

# サブネットの作成
resource "aws_subnet" "private_subnet_a" {
  vpc_id            = data.aws_vpc.default.id
  cidr_block        = "172.31.48.0/20"
  availability_zone = "ap-northeast-1a"

	tags = {
		Name = "private_subnet_a"
	}
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id            = data.aws_vpc.default.id
  cidr_block        = "172.31.64.0/20"
  availability_zone = "ap-northeast-1a"

	tags = {
		Name = "public_subnet_a"
	}
}

resource "aws_subnet" "private_subnet_c" {
  vpc_id            = data.aws_vpc.default.id
  cidr_block        = "172.31.80.0/20"
  availability_zone = "ap-northeast-1c"

	tags = {
		Name = "private_subnet_c"
	}
}

resource "aws_subnet" "public_subnet_c" {
  vpc_id            = data.aws_vpc.default.id
  cidr_block        = "172.31.96.0/20"
  availability_zone = "ap-northeast-1c"

	tags = {
		Name = "public_subnet_c"
	}
}

# ルートテーブルとサブネットの関連付け
resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_subnet_a.id
  route_table_id = aws_route_table.private_route_table.id
}

resource "aws_route_table_association" "private_c" {
  subnet_id      = aws_subnet.private_subnet_c.id
  route_table_id = aws_route_table.private_route_table.id
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_c" {
  subnet_id      = aws_subnet.public_subnet_c.id
  route_table_id = aws_route_table.public_route_table.id
}
