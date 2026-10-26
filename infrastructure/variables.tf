
variable "organization_id" {
  description = "Numeric GCP Organization ID"
  type        = string
}

variable "environment_folders" {
  description = "Environment folder names to manage"
  type        = set(string)
  default     = ["Development", "Production"]
}
