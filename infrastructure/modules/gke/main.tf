
resource "google_container_cluster" "nexora" {
  project  = var.project_id
  name     = "nexora-${var.environment}-cluster"
  location = var.region

  enable_autopilot = true

  network    = var.network_name
  subnetwork = var.subnet_name

  ip_allocation_policy {
    cluster_secondary_range_name  = "gke-pods"
    services_secondary_range_name = "gke-services"
  }

  deletion_protection =  false
}
