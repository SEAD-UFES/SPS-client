import Validator from "validator";
import isEmpty from "./is-empty";

// CPF validation
export const validateCpf = cpf => {
  cpf = !isEmpty(cpf) ? cpf : "";
  let error;

  if (!isEmpty(cpf)) {
    if (!cpfVerification(cpf.replace(/[.-]+/g, ""))) {
      error = "CPF inválido.";
    }

    if (
      !Validator.matches(cpf, /^([0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2})$/)
    ) {
      error = "Formato inválido. Deve estar no formato 000.000.000-00";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

// CPF Required validation
export const validateCpfRequired = cpf => {
  cpf = !isEmpty(cpf) ? cpf : "";

  let { error } = validateCpf(cpf);

  if (Validator.isEmpty(cpf)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//Função que verifica se o CPF é válido.
export function cpfVerification(strCPF) {
  let Soma;
  let Resto;
  Soma = 0;
  if (strCPF === "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10), 10)) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;
  return true;
}
