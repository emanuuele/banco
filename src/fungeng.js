import { toast } from "react-toastify"

export function verificarTipoValor(valor) {
  if (isNaN(valor)) {
    toast.error("Por favor, digite um número válido")
    return false
  }

  return true
}
export function TestaCPF(cpf) {
  var Soma;
  var Resto;
  Soma = 0;

  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  ) {
    toast.error("CPF inválido")
    return false;
  }

  for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) {
    toast.error("CPF inválido")
    return false
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) {
    toast.error("CPF inválido")
    return false
  }
  return true;
}