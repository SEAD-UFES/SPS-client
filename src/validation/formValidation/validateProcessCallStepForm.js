import moment from "moment";
import Validator from "validator";
import { isEmpty, validateDate } from "../";

//####################################################################################//
export const validateProcessCallStepForm = data => {
  let errors = {};
  let field = {};

  field = validateStepType_id(data.stepType_id);
  if (!field.isValid) {
    errors.stepType_id = field.error;
  }

  field = validateResultDate(
    data.resultDate,
    data.openAppealDate,
    data.limitAppealDate,
    data.resultAfterAppealDate
  );
  if (!field.isValid) {
    errors.resultDate = field.error;
  }

  field = validateOpenAppealDate(
    data.resultDate,
    data.openAppealDate,
    data.limitAppealDate,
    data.resultAfterAppealDate
  );
  if (!field.isValid) {
    errors.openAppealDate = field.error;
  }

  field = validateLimitAppealDate(
    data.resultDate,
    data.openAppealDate,
    data.limitAppealDate,
    data.resultAfterAppealDate
  );
  if (!field.isValid) {
    errors.limitAppealDate = field.error;
  }

  field = validateResultAfterAppealDate(
    data.resultDate,
    data.openAppealDate,
    data.limitAppealDate,
    data.resultAfterAppealDate
  );
  if (!field.isValid) {
    errors.resultAfterAppealDate = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

//####################################################################################//
export const validateStepType_id = stepType_id => {
  let error = "";
  if (Validator.isEmpty(stepType_id)) {
    error = "Este campo é requerido.";
  }
  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//####################################################################################//
export const validateResultDate = (
  resultDate,
  openAppealDate,
  limitAppealDate,
  resultAfterAppealDate,
  required = true
) => {
  let error = "";
  let field = {};

  //!é requerido
  if (required && Validator.isEmpty(resultDate)) {
    error = "Este campo é requerido.";
  }

  //!é data
  field = validateDate(resultDate);
  if (!field.isValid) {
    error = field.error;
  }

  //!está entre inicio e encerramento da chamada
  //Feito no servidor

  //!vem antes da abertura de recurso
  if (
    !isEmpty(openAppealDate) &&
    moment(resultDate, "YYYY-MM-DD") > moment(openAppealDate, "YYYY-MM-DD")
  ) {
    error = "Data do resultado maior que data de abertura de recurso.";
  }

  //!vem antes do encerramento de recurso
  if (
    !isEmpty(limitAppealDate) &&
    moment(resultDate, "YYYY-MM-DD") > moment(limitAppealDate, "YYYY-MM-DD")
  ) {
    error = "Data do resultado maior que data de encerramento de recurso.";
  }

  //!vem antes do resultado pós recurso
  if (
    !isEmpty(resultAfterAppealDate) &&
    moment(resultDate, "YYYY-MM-DD") >
      moment(resultAfterAppealDate, "YYYY-MM-DD")
  ) {
    error = "Data do resultado maior que data de resultado pós recurso.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//####################################################################################//
export const validateOpenAppealDate = (
  resultDate,
  openAppealDate,
  limitAppealDate,
  resultAfterAppealDate,
  required = true
) => {
  let error = "";
  let field = {};

  //é requerido
  if (required && Validator.isEmpty(openAppealDate)) {
    error = "Este campo é requerido.";
  }

  //!é data
  field = validateDate(openAppealDate);
  if (!field.isValid) {
    error = field.error;
  }

  //está entre inicio e encerramento da chamada
  //Feito no servidor

  //!vem depois do resultado da etapa
  if (
    !isEmpty(resultDate) &&
    moment(openAppealDate, "YYYY-MM-DD") < moment(resultDate, "YYYY-MM-DD")
  ) {
    error = "Data de abertura de recurso menor que data de resultado.";
  }

  //vem antes do limite de recursos
  if (
    !isEmpty(limitAppealDate) &&
    moment(openAppealDate, "YYYY-MM-DD") > moment(limitAppealDate, "YYYY-MM-DD")
  ) {
    error =
      "Data de abertura de recurso maior que data de encerramento de recurso.";
  }

  //!vem antes do resultado pós recurso
  if (
    !isEmpty(resultAfterAppealDate) &&
    moment(openAppealDate, "YYYY-MM-DD") >
      moment(resultAfterAppealDate, "YYYY-MM-DD")
  ) {
    error =
      "Data de abertura de recurso maior que data de resultado pós recurso.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//####################################################################################//
export const validateLimitAppealDate = (
  resultDate,
  openAppealDate,
  limitAppealDate,
  resultAfterAppealDate,
  required = true
) => {
  let error = "";
  let field = {};

  //é requerido
  if (required && Validator.isEmpty(limitAppealDate)) {
    error = "Este campo é requerido.";
  }

  //!é data
  field = validateDate(limitAppealDate);
  if (!field.isValid) {
    error = field.error;
  }

  //está entre inicio e encerramento da chamada
  //Feito no servidor

  //!vem depois do resultado da etapa
  if (
    !isEmpty(resultDate) &&
    moment(limitAppealDate, "YYYY-MM-DD") < moment(resultDate, "YYYY-MM-DD")
  ) {
    error = "Data limite de recurso menor que data de resultado.";
  }

  //!vem depois do inicio de recursos
  if (
    !isEmpty(openAppealDate) &&
    moment(limitAppealDate, "YYYY-MM-DD") < moment(openAppealDate, "YYYY-MM-DD")
  ) {
    error = "Data limite de recurso menor que data de abertura de recurso.";
  }

  //!vem antes do resultado pós recurso
  if (
    !isEmpty(resultAfterAppealDate) &&
    moment(limitAppealDate, "YYYY-MM-DD") >
      moment(resultAfterAppealDate, "YYYY-MM-DD")
  ) {
    error = "Data limite de recurso maior que data de resultado pós recurso.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//####################################################################################//
export const validateResultAfterAppealDate = (
  resultDate,
  openAppealDate,
  limitAppealDate,
  resultAfterAppealDate,
  required = true
) => {
  let error = "";
  let field = {};

  //é requerido
  if (required && Validator.isEmpty(resultAfterAppealDate)) {
    error = "Este campo é requerido.";
  }

  //!é data
  field = validateDate(resultAfterAppealDate);
  if (!field.isValid) {
    error = field.error;
  }

  //está entre inicio e encerramento da chamada
  //Feito no servidor

  //!vem depois do resultado da etapa
  if (
    !isEmpty(resultDate) &&
    moment(resultAfterAppealDate, "YYYY-MM-DD") <
      moment(resultDate, "YYYY-MM-DD")
  ) {
    error = "Data de resultado pós recurso menor que data de resultado.";
  }

  //!vem depois do inicio de recursos
  if (
    !isEmpty(openAppealDate) &&
    moment(resultAfterAppealDate, "YYYY-MM-DD") <
      moment(openAppealDate, "YYYY-MM-DD")
  ) {
    error =
      "Data de resultado pós recurso menor que data de abertura de recurso.";
  }

  //!vem depois do resultado pós recurso
  if (
    !isEmpty(limitAppealDate) &&
    moment(resultAfterAppealDate, "YYYY-MM-DD") <
      moment(limitAppealDate, "YYYY-MM-DD")
  ) {
    error = "Data de resultado pós recurso menor que data limite de recurso.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
//####################################################################################//
