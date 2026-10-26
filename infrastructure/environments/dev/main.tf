
module "artifact_registry" {
  source = "../../modules/artifact-registry"

  project_id  = var.project_id
  region      = var.region
  environment = "dev"
}

module "networking" {
  source = "../../modules/networking"

  project_id  = var.project_id
  region      = var.region
  environment = "dev"
}

module "gke" {
  source = "../../modules/gke"

  project_id   = var.project_id
  region       = var.region
  environment  = "dev"

  network_name = module.networking.network_name
  subnet_name  = module.networking.subnet_name

  depends_on = [module.networking]
}
