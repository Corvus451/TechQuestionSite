<h1 align="center">Tech Question Site</h1>

## About the project

This is a tech question forum website like Stackoverflow. Users can create account, post questions about various topics and answer to others questions. The project is written to run in AWS EKS so it is easily scalable. Currently, the backend is implemented, and it can be used with API calls. A frontend will be created in the future.

### Technologies used

* AWS
* Kubernetes
* Docker
* Terraform
* Express JS
* PostgreSQL


## Dependencies

* AWS CLI
* Docker
* KubeCTL
* Terraform
* npm



## Usage

1. cd into `Terraform` directory
    ```sh
    cd Terraform
    ```
2. Make a `secret.auto.tfvars` file from `secret.auto.tfvars.template`
    ```sh
    cp secret.auto.tfvars.template secret.auto.tfvars
    ```
3. Fill the file with the correct values
4. Initialize the terraform file
    ```sh
    terraform init
    ```
5. Run terraform apply and then type yes
    ```sh
    terraform apply
    ```
6. After terraform finished creating the resources, get the website endpoint:
    ```sh
    kubectl get ingress
    ```
7. Using the endpoint, you can make API calls to the server.

    For API Reference, check `./APIServer/test.http`

### Deleting the infrastructure

1. Delete every resource in kubernetes
    ```sh
    kubectl delete all --all
    ```
    get the ingress name and delete it as well
    ```sh
    kubectl get ingress
    kubectl delete ingress <ingress name>
    ```
2. Delete the ECR images created by terraform, from the AWS console, or with aws cli:
    ```sh
    aws ecr delete-repository --repository-name <repository name> --force
3. Run terraform destroy and type yes to wipe the resources
    ```sh
    terraform destroy
    ```
    After it finishes, The project is deleted from AWS.