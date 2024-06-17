data "aws_route53_zone" "main" {
  name         = "member0005.track-bootcamp.run."
  private_zone = false
}

resource "aws_route53_record" "backend" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "team-7_bk.member0005.track-bootcamp.run"
  type    = "A"

  alias {
    name                   = aws_lb.ecs_alb.dns_name
    zone_id                = aws_lb.ecs_alb.zone_id
    evaluate_target_health = true
  }
}

