resource "kubernetes_deployment_v1" "authserver" {
  metadata {
    name = "authserver"
    labels = {
      app = "authserver"
    }
  }

  spec {
    replicas = var.authserver_replicas

    selector {
      match_labels = {
        app = "authserver"
      }
    }

    template {
      metadata {
        labels = {
          app = "authserver"
        }
      }

      spec {
        container {
          image = var.authserver_image
          name  = "authserver"

          resources {
            limits = {
              cpu    = "0.5"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "50Mi"
            }
          }

          env {
            name = "PGUSER"
            value = var.env_db_username
          }

          env {
            name = "PGHOST"
            value = var.env_db_host
          }

          env {
            name = "PGDATABASE"
            value = var.env_db_name
          }

          env {
            name = "PGPASSWORD"
            value = var.env_db_password
          }

          env {
            name = "PGPORT"
            value = var.env_db_port
          }

          env {
          name = "SERVER_PORT"
          value = var.authserver_port  
          }

          env {
            name = "ENDPOINT_PREFIX"
            value = var.env_endpoint_prefix
          }

          env {
            name = "JWT_SECRET"
            value = var.env_jwt_secret
          }

          env {
            name = "JWT_EXPIRES_IN"
            value = var.env_jwt_expires_in
          }

          port {
            container_port = var.authserver_port
          }

        #   liveness_probe {
        #     http_get {
        #       path = "/"
        #       port = 80

        #       http_header {
        #         name  = "X-Custom-Header"
        #         value = "Awesome"
        #       }
        #     }

        #     initial_delay_seconds = 3
        #     period_seconds        = 3
        #   }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "authserver" {
  metadata {
    name = "authserver-svc"
  }
  spec {
    selector = {
      app = kubernetes_deployment_v1.authserver.metadata[0].labels.app
    }

    port {
      port        = var.authserver_port
      target_port = var.authserver_port
    #   node_port   = 30080
    }

    type = "NodePort"
  }
}