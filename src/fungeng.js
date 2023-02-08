import { toast } from "react-toastify"

export function verificarTipoValor(valor){
    if (isNaN(valor)) {
        toast.error("Por favor, digite um número válido")
      return false
    }

    return true
  }