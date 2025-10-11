output "authserver_svc_name" {
  value = kubernetes_service_v1.authserver.metadata[0].name
}