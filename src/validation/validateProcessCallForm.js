import moment from "moment";
import { isEmpty, validateNumberRequired, validateDateRequired } from "./";

// create call validation
export const validateProcessCallForm = data => {
  let errors = {};
  let field = {};

  field = validateNumberRequired(data.number);
  if (!field.isValid) {
    errors.number = field.error;
  }

  field = validateInscriptionsStart(
    data.inscriptionsStart,
    data.inscriptionsEnd,
    data.callEnd
  );
  if (!field.isValid) {
    errors.inscriptionsStart = field.error;
  }

  field = validateInscriptionsEnd(
    data.inscriptionsStart,
    data.inscriptionsEnd,
    data.callEnd
  );
  if (!field.isValid) {
    errors.inscriptionsEnd = field.error;
  }

  field = validateCallEnd(
    data.inscriptionsStart,
    data.inscriptionsEnd,
    data.callEnd
  );
  if (!field.isValid) {
    errors.callEnd = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

//InscriptionsStart validation####################
export const validateInscriptionsStart = (
  inscriptionsStart,
  inscriptionsEnd,
  callEnd
) => {
  inscriptionsStart = !isEmpty(inscriptionsStart) ? inscriptionsStart : "";
  inscriptionsEnd = !isEmpty(inscriptionsEnd) ? inscriptionsEnd : "";
  callEnd = !isEmpty(callEnd) ? callEnd : "";

  let { error } = validateDateRequired(inscriptionsStart);

  if (isEmpty(error)) {
    //deve ser antes do encerramento
    if (
      !isEmpty(inscriptionsEnd) &&
      moment(inscriptionsStart, "YYYY-MM-DD") >
        moment(inscriptionsEnd, "YYYY-MM-DD")
    ) {
      error = "Início das inscrições após encerramento das inscrições.";
    }

    //deve ser antes do fim da chamada
    if (
      !isEmpty(callEnd) &&
      moment(inscriptionsStart, "YYYY-MM-DD") > moment(callEnd, "YYYY-MM-DD")
    ) {
      error = "Início das inscrições após encerramento da chamada.";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//InscriptionsEnd validation####################
export const validateInscriptionsEnd = (
  inscriptionsStart,
  inscriptionsEnd,
  callEnd
) => {
  inscriptionsStart = !isEmpty(inscriptionsStart) ? inscriptionsStart : "";
  inscriptionsEnd = !isEmpty(inscriptionsEnd) ? inscriptionsEnd : "";
  callEnd = !isEmpty(callEnd) ? callEnd : "";

  let { error } = validateDateRequired(inscriptionsEnd);

  if (isEmpty(error)) {
    //deve ser depois da abertura das inscrições
    if (
      !isEmpty(inscriptionsStart) &&
      moment(inscriptionsEnd, "YYYY-MM-DD") <
        moment(inscriptionsStart, "YYYY-MM-DD")
    ) {
      error = "Encerramento das inscrições antes da abertura das inscrições.";
    }

    //deve ser antes do fim da chamada
    if (
      !isEmpty(callEnd) &&
      moment(inscriptionsEnd, "YYYY-MM-DD") > moment(callEnd, "YYYY-MM-DD")
    ) {
      error = "Encerramento das inscrições após encerramento da chamada.";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//callEnd validation####################
export const validateCallEnd = (
  inscriptionsStart,
  inscriptionsEnd,
  callEnd
) => {
  inscriptionsStart = !isEmpty(inscriptionsStart) ? inscriptionsStart : "";
  inscriptionsEnd = !isEmpty(inscriptionsEnd) ? inscriptionsEnd : "";
  callEnd = !isEmpty(callEnd) ? callEnd : "";

  let { error } = validateDateRequired(callEnd);

  if (isEmpty(error)) {
    //deve ser depois da abertura das inscrições
    if (
      !isEmpty(inscriptionsStart) &&
      moment(callEnd, "YYYY-MM-DD") < moment(inscriptionsStart, "YYYY-MM-DD")
    ) {
      error = "Encerramento da chamada antes da abertura das inscrições.";
    }

    //deve ser depois do encerramento das inscrições
    if (
      !isEmpty(inscriptionsEnd) &&
      moment(callEnd, "YYYY-MM-DD") < moment(inscriptionsEnd, "YYYY-MM-DD")
    ) {
      error = "Encerramento da chamada antes do encerramento das inscrições.";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
