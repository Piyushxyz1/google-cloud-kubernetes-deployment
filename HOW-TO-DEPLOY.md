# Step 1 — Configure Google Cloud

## 1.1 Select your GCP project and enable APIs

```bash
gcloud config set project YOUR_PROJECT_ID

gcloud services enable \
  container.googleapis.com \
  artifactregistry.googleapis.com \
  compute.googleapis.com
```

Verify the active project:

```bash
gcloud config get-value project
```

## 1.2 Create an Artifact Registry repository

```bash
gcloud artifacts repositories create YOUR_REPOSITORY_NAME \
  --repository-format=docker \
  --location=YOUR_REGION \
  --description="Frontend and backend Docker images"
```

Configure Docker authentication:

```bash
gcloud auth configure-docker YOUR_REGION-docker.pkg.dev
```

Your Artifact Registry image path will follow this format:

```text
YOUR_REGION-docker.pkg.dev/YOUR_PROJECT_ID/YOUR_REPOSITORY_NAME/
```

## 1.3 Get your project source code into Cloud Shell

Clone your GitHub repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
```

Navigate into the project directory:

```bash
cd YOUR_REPOSITORY_NAME
```

Verify the project files:

```bash
ls
```

If the repository is already cloned in Cloud Shell, navigate into the existing directory and pull the latest changes instead:

```bash
cd ~/YOUR_REPOSITORY_NAME
git pull
```
