
resource "google_artifact_registry_repository" "nexora" {
  project       = var.project_id
  location      = var.region
  repository_id = "nexora-${var.environment}-images"
  description   = "Docker images for Nexora ${var.environment}"
  format        = "DOCKER"
}
