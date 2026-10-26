
output "environment_folders" {
  description = "Created or managed environment folders"
  value = {
    for name, folder in google_folder.environment :
    name => {
      display_name = folder.display_name
      folder_id    = folder.folder_id
    }
  }
}
