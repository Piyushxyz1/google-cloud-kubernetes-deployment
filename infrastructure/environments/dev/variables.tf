
variable "project_id" {
  description = "GCP project ID for this environment"
  type        = string
}

variable "region" {
  description = "GCP region for this environment"
  type        = string
  default     = "asia-south1"
}
