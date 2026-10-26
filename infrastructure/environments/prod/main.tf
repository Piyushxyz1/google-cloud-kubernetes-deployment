
resource "google_folder" "environment" {
  for_each = var.environment_folders

  display_name = each.value
  parent       = "organizations/${var.organization_id}"
}
