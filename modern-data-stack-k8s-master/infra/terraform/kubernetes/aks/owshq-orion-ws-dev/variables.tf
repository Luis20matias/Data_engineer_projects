variable "resource_group_location" {
  type        = string
  default     = "eastus2"
}

variable "resource_group_name_prefix" {
  type        = string
  default     = "rg-modern-data-plataform-cluster"
}

variable "cluster_name" {
  type        = string
  default     = "modern-data-plataform-cluster"
}

variable "dns_prefix" {
  type        = string
  default     = "dns-modern-data-plataform-cluster"
}

variable "vm_size" {
  type        = string
  default     = "Standard_D8s_v3"
}


variable "node_count" {
  type        = number
  default     = 3
}

variable "msi_id" {
  type        = string
  default     = null
}