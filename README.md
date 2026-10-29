# Nexora — Full-Stack Application Deployment on GCP

This project demonstrates the containerization and deployment of a full-stack web application on Google Cloud Platform (GCP) using Docker, Google Kubernetes Engine (GKE), and Kubernetes networking resources.

The frontend and backend were containerized separately, stored in Google Artifact Registry, and deployed to a GKE Autopilot cluster. GKE Ingress was configured to provision a Google Cloud Load Balancer and route external HTTP traffic to the appropriate Kubernetes Services.

## Tech Stack

**Cloud Platform**
- Google Cloud Platform (GCP)
- Google Kubernetes Engine (GKE Autopilot)
- Google Artifact Registry
- Google Cloud Load Balancer
- Google Cloud Shell
- Google Cloud Build

**Containerization and Orchestration**
- Docker
- Kubernetes
- Kubernetes Deployments
- Kubernetes ClusterIP Services
- Kubernetes Secrets
- Kubernetes Ingress
- `kubectl`
- `gcloud` CLI

**Application Runtime**
- React frontend served using Nginx
- Node.js and Express backend

## Deployment Architecture

```text
                 User / Browser
                       |
                       v
            Google Cloud Load Balancer
                       |
                       v
                  GKE Ingress
                   /       \
                  /         \
                 v           v
        Frontend Service  Backend Service
             Port 80        Port 8000
                 |              |
                 v              v
          Frontend Pods    Backend Pods

       Docker Images stored in
       Google Artifact Registry
                 |
                 v
          GKE pulls images
          to run containers
```

## Deployment Workflow

### 1. Google Cloud Configuration

- Selected the target GCP project.
- Enabled the required Google Cloud APIs.
- Created a Docker repository in Google Artifact Registry.
- Configured Docker authentication for the Artifact Registry region.
- Cloned the project source code into Google Cloud Shell.

### 2. Docker Image Creation

Created separate Docker images for the frontend and backend.

- **Frontend:** Used a multi-stage Docker build to generate the production React assets and serve them through Nginx.
- **Backend:** Packaged the Node.js application and production dependencies into a Docker image.

Google Cloud Build was used to build and publish the container images.

### 3. Artifact Registry

Published the frontend and backend Docker images to Google Artifact Registry.

Artifact Registry serves as the centralized container image repository from which GKE retrieves the images for deployment.

### 4. GKE Cluster Setup

Created a GKE Autopilot cluster in the `asia-south1` region and connected to it using `gcloud` and `kubectl`.

GKE Autopilot manages the underlying Kubernetes infrastructure while allowing deployment and management of application workloads through Kubernetes resources.

### 5. Kubernetes Deployments and Services

Created separate Kubernetes Deployments for the frontend and backend.

Configured ClusterIP Services to provide stable internal endpoints for the application workloads:

- Frontend Service: Port `80`
- Backend Service: Port `8000`

These Services allow the Ingress to forward incoming traffic to the correct application workloads without exposing the backend directly through a public IP.

### 6. Kubernetes Secrets

Configured Kubernetes Secrets to provide sensitive backend environment variables at runtime, including database connection details, JWT configuration, and payment credentials.

Sensitive values were kept separate from application source code and container image definitions.

### 7. Ingress and Google Cloud Load Balancer

Configured a Kubernetes Ingress using the GKE Google Cloud load-balancing integration.

The routing rules were configured as follows:

- `/` → Frontend Service on port `80`
- `/api` → Backend Service on port `8000`

GKE provisioned an external Google Cloud Load Balancer and assigned an external IP address to the Ingress.

This provides a single external entry point for accessing both the frontend and backend API routes.

### 8. Deployment Verification

Verified the deployment using Kubernetes commands, including:

```bash
kubectl get pods
kubectl get services
kubectl get ingress
kubectl describe ingress nexora-ingress
```

Checked pod status, Service endpoints, Ingress routing, and external IP provisioning.

Resolved initial workload scheduling and Load Balancer provisioning delays before confirming that the application was accessible through the external IP address.

## Key DevOps Implementation

- Containerized frontend and backend applications using Docker.
- Built and published images using Google Cloud Build.
- Stored container images in Google Artifact Registry.
- Deployed workloads on GKE Autopilot.
- Configured Kubernetes Deployments, ClusterIP Services, and Secrets.
- Implemented path-based routing using GKE Ingress.
- Exposed the application through a Google Cloud Load Balancer.
- Verified deployment status and connectivity using `kubectl` and Google Cloud CLI tools.

## Deployment Status

The full-stack application was successfully deployed to GKE and made accessible through the external IP assigned to the Google Cloud Load Balancer.

**Author:** Piyush Negi
