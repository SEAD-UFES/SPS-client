import {
  isEmpty,
  validateName,
  validateSurname,
  validateCpfRequired,
  validateDate
} from "../";

// Register validation
export const validateProfileEditPersonForm = data => {
  let errors = {};
  let field = {};

  //nome
  field = validateName(data.name);
  if (!field.isValid) {
    errors.name = field.error;
  }

  //sobrenome
  field = validateSurname(data.surname);
  if (!field.isValid) {
    errors.surname = field.error;
  }

  //cpf
  field = validateCpfRequired(data.cpf);
  if (!field.isValid) {
    errors.cpf = field.error;
  }

  //data
  field = validateDate(data.birthdate);
  if (!field.isValid) {
    errors.birthdate = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
