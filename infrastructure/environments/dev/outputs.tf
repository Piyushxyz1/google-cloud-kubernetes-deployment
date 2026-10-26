
output "cluster_name" {
  description = "GKE cluster name"
  value       = module.gke.cluster_name
}

output "cluster_location" {
  description = "GKE cluster region"
  value       = module.gke.cluster_location
}

output "artifact_registry_url" {
  description = "Artifact Registry repository URL"
  value       = module.artifact_registry.repository_url
}

output "network_name" {
  description = "VPC network name"
  value       = module.networking.network_name
}
