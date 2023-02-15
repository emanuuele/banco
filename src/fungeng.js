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
}//----------------------------------------------------------------------------------------------------
export function validarCNPJ(cpf) {
 
  cpf = cpf.replace(/[^\d]+/g,'');

  if(cpf == '') return false;
   
  if (cpf.length != 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cpf == "00000000000000" || 
      cpf == "11111111111111" || 
      cpf == "22222222222222" || 
      cpf == "33333333333333" || 
      cpf == "44444444444444" || 
      cpf == "55555555555555" || 
      cpf == "66666666666666" || 
      cpf == "77777777777777" || 
      cpf == "88888888888888" || 
      cpf == "99999999999999") {

        toast.error("CNPJ inválido")
        return false;
      }
       
  // Valida DVs
  let tamanho = cpf.length - 2
  let numeros = cpf.substring(0,tamanho);
  let digitos = cpf.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)){
    toast.error("CNPJ inválido")
    return false;
  }
       
  tamanho = tamanho + 1;
  numeros = cpf.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)){
    toast.error("CNPJ inválido")
    return false;
  }
         
  return true;
}