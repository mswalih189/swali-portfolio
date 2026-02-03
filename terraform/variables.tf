variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-south-1"  # Mumbai region
}

variable "bucket_name" {
  description = "Name of the S3 bucket for the portfolio website"
  type        = string
  default     = "mohammed-swalih-portfolio"
}
