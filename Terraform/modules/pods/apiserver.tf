resource "kubernetes_deployment_v1" "apiserver" {
  metadata {
    name = "apiserver"
    labels = {
      app = "apiserver"
    }
  }

  spec {
    replicas = var.apiserver_replicas

    selector {
      match_labels = {
        app = "apiserver"
      }
    }

    template {
      metadata {
        labels = {
          app = "apiserver"
        }
      }

      spec {
        container {
          image = var.apiserver_image
          name  = "apiserver"

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
          value = 3000  
          }

          port {
            container_port = var.apiserver_port
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

resource "kubernetes_service_v1" "apiserver" {
  metadata {
    name = "apiserver-svc"
  }
  spec {
    selector = {
      app = kubernetes_deployment_v1.apiserver.metadata[0].labels.app
    }

    port {
      port        = var.apiserver_port
      target_port = var.apiserver_port
    #   node_port   = 30080
    }

    type = "NodePort"
  }
}