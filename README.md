# Kubernetes Manifests (Split)

## Passos
1. Edite os **TODOs** (imagens, host do ingress, senhas).
2. Aplique em ordem ou via Kustomize:
   ```bash
   kubectl apply -f 00-namespace.yaml
   kubectl apply -f 01-secret-mysql.yaml
   kubectl apply -f 02-configmap-app.yaml
   kubectl apply -f 03-configmap-mysql-init.yaml
   kubectl apply -f 10-mysql-service.yaml
   kubectl apply -f 11-mysql-statefulset.yaml
   kubectl rollout status statefulset/mysql -n app-demo
   kubectl apply -f 20-backend-service.yaml
   kubectl apply -f 21-backend-deployment.yaml
   kubectl apply -f 30-frontend-service.yaml
   kubectl apply -f 31-frontend-deployment.yaml
   kubectl apply -f 40-ingress.yaml
   # opcional:
   kubectl apply -f 50-job-mysql-import.yaml
   kubectl apply -f 90-service-nodeport.yaml
   ```
   Ou:
   ```bash
   kubectl apply -k .
   ```

## Notas
- **Backend**: defina `image: your-docker-registry/your-backend:latest`.
- **Frontend**: defina `image: your-docker-registry/your-frontend:latest`.
- **Ingress**: se usar K3s/Traefik, troque a classe/annotations conforme necessidade.
- **Dump**: adapte `50-job-mysql-import.yaml` para baixar ou montar o arquivo.
