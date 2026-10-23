# How to Deploy a Full-Stack Application on Google Cloud Platform (GCP)

This guide documents the containerization and deployment of a full-stack web application on Google Cloud Platform using Docker, Google Artifact Registry, Google Kubernetes Engine (GKE Autopilot), Kubernetes, and Google Cloud Load Balancing.

The deployment uses separate frontend and backend containers, Kubernetes Deployments and ClusterIP Services, Kubernetes Secrets for backend configuration, and GKE Ingress for external HTTP traffic routing.

## Table of Contents

1. Prerequisites
2. Configure Google Cloud
3. Clone the Source Code
4. Prepare the Docker Images
5. Build and Push Images Using Cloud Build
6. Create the GKE Autopilot Cluster
7. Connect kubectl to GKE
8. Configure Backend Secrets
9. Deploy the Backend
10. Deploy the Frontend
11. Configure Ingress and Load Balancing
12. Verify the Deployment
13. Troubleshooting
14. Cost Management and Cleanup

---

## Step 1 — Prerequisites

The following tools and services are required:

- A Google Cloud account with an active project and billing enabled.
- Google Cloud Shell or a local terminal with the Google Cloud CLI.
- Git and a GitHub repository containing the application.
- Docker-compatible Dockerfiles for the frontend and backend.
- A MongoDB database accessible from the deployed backend.
- Required backend environment variables.

The deployment uses these Google Cloud services:

| Service | Purpose |
|---|---|
| Google Kubernetes Engine | Runs the application containers |
| Artifact Registry | Stores Docker images |
| Cloud Build | Builds and publishes Docker images |
| Compute Engine APIs | Supports the underlying networking and load-balancing infrastructure |
| Google Cloud Load Balancer | Exposes the application externally |

## Step 2 — Configure Google Cloud

### 2.1 Select the GCP project

Replace `YOUR_PROJECT_ID` with your Google Cloud project ID.

```bash
gcloud config set project YOUR_PROJECT_ID
```

Verify the active project:

```bash
gcloud config get-value project
```

### 2.2 Enable the required APIs

```bash
gcloud services enable \
  container.googleapis.com \
  artifactregistry.googleapis.com \
  compute.googleapis.com \
  cloudbuild.googleapis.com
```

These APIs support GKE, container image storage, load-balancing infrastructure, and image builds.

### 2.3 Create an Artifact Registry repository

Set the region and repository name:

```bash
export REGION=asia-south1
export REPOSITORY=nexora-images
```

Create the Docker repository:

```bash
gcloud artifacts repositories create "$REPOSITORY" \
  --repository-format=docker \
  --location="$REGION" \
  --description="Frontend and backend Docker images"
```

If the repository already exists, verify it instead of creating it again:

```bash
gcloud artifacts repositories list \
  --location="$REGION"
```

Configure Docker authentication:

```bash
gcloud auth configure-docker asia-south1-docker.pkg.dev
```

The full Artifact Registry image path follows this format:

```text
REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE:TAG
```

## Step 3 — Clone the Source Code

Clone the application repository into Cloud Shell:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
```

Navigate to the project:

```bash
cd YOUR_REPOSITORY_NAME
```

Inspect the project structure:

```bash
ls
```

The deployment uses the frontend, backend, and Kubernetes configuration directories.

```text
project/
├── client/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── ...
├── server/
│   ├── Dockerfile
│   └── ...
└── k8s/
    ├── backend.yaml
    ├── frontend.yaml
    └── ingress.yaml
```

If the repository is already present in Cloud Shell, update it instead of cloning again:

```bash
cd ~/YOUR_REPOSITORY_NAME
git pull
```

## Step 4 — Prepare the Docker Images

The frontend and backend are packaged into separate Docker images.

### 4.1 Frontend Dockerfile

The frontend uses a multi-stage Docker build. The first stage installs dependencies and builds the React application, while the second stage serves the generated static files through Nginx.

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 4.2 Configure Nginx

The `client/nginx.conf` file serves the frontend and supports client-side routing.

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 4.3 Frontend API configuration

For this deployment, frontend API requests use relative paths through the same external hostname.

For example:

```javascript
export const API_URL = "";
```

This allows requests such as `/api/cart` and `/api/orders` to be routed through GKE Ingress to the backend.

The frontend must actually use this configuration in its API calls. An empty API base URL does not automatically change hard-coded absolute URLs elsewhere in the application.

### 4.4 Backend Dockerfile

The backend Dockerfile packages the Node.js application and its production dependencies.

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 8000

CMD ["npm", "start"]
```

The backend package must have a valid `start` script, for example:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

The application must listen on port `8000` and bind to `0.0.0.0` inside the container.

## Step 5 — Build and Push Docker Images

Google Cloud Build builds the images and publishes them to Artifact Registry.

Set the project and image paths:

```bash
export PROJECT_ID="$(gcloud config get-value project)"
export REGION=asia-south1
export REPOSITORY=nexora-images

export REGISTRY="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}"
```

### 5.1 Build the backend image

Run this command from the project root:

```bash
gcloud builds submit ./server \
  --tag "${REGISTRY}/nexora-backend:v2"
```

### 5.2 Build the frontend image

```bash
gcloud builds submit ./client \
  --tag "${REGISTRY}/nexora-frontend:v1"
```

Cloud Build uploads the build context, builds the Docker image, and pushes it to Artifact Registry.

### 5.3 Verify the published images

```bash
gcloud artifacts docker images list "$REGISTRY"
```

Confirm that both frontend and backend images are present before deploying them to GKE.

If you change application code or a Dockerfile later, rebuild and publish a new image tag, then update the corresponding Kubernetes Deployment.

## Step 6 — Create the GKE Autopilot Cluster

Create the cluster in the `asia-south1` region:

```bash
gcloud container clusters create-auto nexora-cluster \
  --region=asia-south1
```

If the cluster already exists, do not create it again. Inspect it:

```bash
gcloud container clusters list \
  --region=asia-south1
```

GKE Autopilot manages the underlying node infrastructure and automatically provisions capacity as needed for eligible workloads.

## Step 7 — Connect kubectl to GKE

Fetch cluster credentials:

```bash
gcloud container clusters get-credentials nexora-cluster \
  --region=asia-south1 \
  --project="$(gcloud config get-value project)"
```

Verify the Kubernetes connection:

```bash
kubectl cluster-info
kubectl get nodes
kubectl get pods -A
```

On Autopilot, nodes and system workloads may take time to appear during initial provisioning. A temporarily empty node list does not by itself mean the cluster is broken.

## Step 8 — Configure Backend Secrets

The backend requires sensitive environment variables, including:

- `mongo_db`
- `JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Create a Kubernetes Secret without committing actual secret values to source control.

One interactive approach is:

```bash
read -rsp "MongoDB connection string: " MONGO_DB
echo
read -rsp "JWT secret: " JWT_SECRET
echo
read -rsp "Razorpay key ID: " RAZORPAY_KEY_ID
echo
read -rsp "Razorpay key secret: " RAZORPAY_KEY_SECRET
echo
```

Create or update the Secret:

```bash
kubectl create secret generic nexora-backend-secrets \
  --from-literal=mongo_db="$MONGO_DB" \
  --from-literal=JWT_SECRET="$JWT_SECRET" \
  --from-literal=RAZORPAY_KEY_ID="$RAZORPAY_KEY_ID" \
  --from-literal=RAZORPAY_KEY_SECRET="$RAZORPAY_KEY_SECRET" \
  --dry-run=client -o yaml | kubectl apply -f -
```

Clear the shell variables when finished:

```bash
unset MONGO_DB JWT_SECRET RAZORPAY_KEY_ID RAZORPAY_KEY_SECRET
```

Verify that the Secret exists without printing its contents:

```bash
kubectl get secret nexora-backend-secrets
```

Kubernetes Secrets are not automatically encrypted at the application level merely because they are stored as Secrets. Restrict access through IAM and Kubernetes RBAC, and never publish their values.

The MongoDB database must also permit connectivity from the deployed backend.

## Step 9 — Deploy the Backend

The `k8s/backend.yaml` manifest defines the backend Deployment and ClusterIP Service.

The Deployment specifies the backend image, container port, and Secret-backed environment variables.

Apply the manifest:

```bash
kubectl apply -f k8s/backend.yaml
```

Inspect the backend resources:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

Check the backend logs if the pod does not become ready:

```bash
kubectl logs deployment/nexora-backend
```

Inspect pod events and configuration:

```bash
kubectl describe deployment nexora-backend
kubectl describe pods -l app=nexora-backend
```

The backend Service should expose port `8000` internally, with traffic directed to the backend container's port `8000`.

## Step 10 — Deploy the Frontend

The `k8s/frontend.yaml` manifest defines the frontend Deployment and ClusterIP Service.

Apply it:

```bash
kubectl apply -f k8s/frontend.yaml
```

Verify the frontend resources:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

Inspect the frontend logs:

```bash
kubectl logs deployment/nexora-frontend
```

The frontend Service exposes port `80` and directs traffic to the Nginx container.

At this stage, the frontend and backend are available through their internal Kubernetes Services. The next step exposes them through a common external entry point.

## Step 11 — Configure Ingress and Google Cloud Load Balancing

The `k8s/ingress.yaml` manifest defines path-based routing through the GKE Ingress integration.

The routing rules are:

| Request path | Destination Service | Service port |
|---|---|---:|
| `/` | `nexora-frontend` | 80 |
| `/api` | `nexora-backend` | 8000 |

Apply the Ingress manifest:

```bash
kubectl apply -f k8s/ingress.yaml
```

Inspect the Ingress:

```bash
kubectl get ingress
kubectl describe ingress nexora-ingress
```

GKE provisions the associated Google Cloud Load Balancer and assigns an external IP address.

Provisioning may take several minutes. An initially empty external IP field does not necessarily indicate a configuration failure.

Once an IP is assigned, retrieve it:

```bash
kubectl get ingress nexora-ingress
```

Open the application using:

```text
http://EXTERNAL_IP
```

For example, replace `EXTERNAL_IP` with the address displayed by `kubectl get ingress`.

The frontend is served through `/`, while requests under `/api` are forwarded to the backend Service.

## Step 12 — Verify the Deployment

### 12.1 Check Kubernetes workloads

```bash
kubectl get deployments
kubectl get pods -o wide
kubectl get services
kubectl get ingress
```

Confirm that the frontend and backend pods are running and that their Services have valid endpoints.

```bash
kubectl get endpoints
```

### 12.2 Check the Ingress routing

```bash
kubectl describe ingress nexora-ingress
```

Verify that the routing backends point to:

- `nexora-frontend` on port `80`
- `nexora-backend` on port `8000`

### 12.3 Test the external endpoints

Replace `EXTERNAL_IP` with the actual Ingress address:

```bash
curl -i http://EXTERNAL_IP/
```

Test the backend root endpoint:

```bash
curl -i http://EXTERNAL_IP/
```

**Note:** The second request above reaches the frontend as well because `/` routes to the frontend. To test the backend, use an actual backend endpoint exposed under `/api`, such as an existing health or API route in the application.

For example, if the backend root endpoint is reachable through an appropriately configured route, test that route. Do not assume every API endpoint is public or that every route returns `200 OK`.

### 12.4 Test application functionality

After the website loads, test the relevant user flows in the browser and inspect browser developer tools and backend logs for failed API requests.

Verify authentication, database connectivity, cart, orders, and payment flows individually before claiming that the entire application has passed end-to-end testing.

## Step 13 — Troubleshooting

### Pods remain Pending

Inspect the pod and its events:

```bash
kubectl get pods
kubectl describe pod POD_NAME
kubectl get events --sort-by=.lastTimestamp
```

GKE Autopilot may need time to provision capacity. Check the events before assuming the workload has failed.

### Pods are in CrashLoopBackOff

Inspect the container logs:

```bash
kubectl logs POD_NAME
kubectl logs POD_NAME --previous
```

Common causes include missing environment variables, database connectivity failures, application startup errors, and incorrect container configuration.

### ImagePullBackOff

Verify that the image path and tag exist:

```bash
gcloud artifacts docker images list "$REGISTRY"
```

Check the pod events:

```bash
kubectl describe pod POD_NAME
```

Ensure the GKE workload has the required permission to pull images from Artifact Registry.

### Ingress has no external IP

Inspect the Ingress and its events:

```bash
kubectl get ingress
kubectl describe ingress nexora-ingress
```

Verify that both Services exist, the Service ports match the Ingress configuration, and the backend pods are available. Allow time for the Google Cloud Load Balancer to provision.

### Website loads but API requests fail

Check the following:

- Frontend API requests use the expected relative `/api` paths.
- The Ingress routes `/api` to the backend Service on port `8000`.
- The backend container listens on the correct port.
- Required environment variables are configured.
- MongoDB connectivity and CORS settings are correct.
- Browser network requests and backend logs show the actual failure.

## Step 14 — Cost Management and Cleanup

GKE Autopilot, Artifact Registry storage, Cloud Build usage, and the external Google Cloud Load Balancer may incur charges.

Check the resources that remain active when the deployment is not being used.

To remove the Ingress and its associated load-balancing configuration:

```bash
kubectl delete -f k8s/ingress.yaml
```

Allow time for the associated cloud load-balancing resources to be released.

To remove the application workloads and Services:

```bash
kubectl delete -f k8s/frontend.yaml
kubectl delete -f k8s/backend.yaml
```

Delete the backend Secret if it is no longer required:

```bash
kubectl delete secret nexora-backend-secrets
```

If the cluster is no longer needed, delete it:

```bash
gcloud container clusters delete nexora-cluster \
  --region=asia-south1
```

Review Artifact Registry repositories and other billable resources separately before deleting them. Removing Kubernetes workloads alone does not necessarily remove every cloud resource or stored image.

## Deployment Summary

The deployment workflow covers:

- Docker containerization of frontend and backend.
- Building and publishing images through Google Cloud Build.
- Image storage in Google Artifact Registry.
- Workload deployment on GKE Autopilot.
- Kubernetes Deployments, ClusterIP Services, and Secrets.
- GKE Ingress configuration and Google Cloud Load Balancing.
- External application access through an assigned IP.
- Kubernetes troubleshooting and cloud cost management.

This project demonstrates practical experience deploying a containerized full-stack application on Google Cloud Platform using managed Kubernetes infrastructure and cloud-native networking resources.
