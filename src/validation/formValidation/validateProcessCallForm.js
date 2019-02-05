import moment from "moment";
import { isEmpty, validateNumberRequired, validateDateRequired } from "../";

// create call validation
export const validateProcessCallForm = data => {
  let errors = {};
  let field = {};

  field = validateNumberRequired(data.number);
  if (!field.isValid) {
    errors.number = field.error;
  }

  field = validateEnrollmentOpeningDate(
    data.enrollmentOpeningDate,
    data.enrollmentClosingDate,
    data.endingDate
  );
  if (!field.isValid) {
    errors.enrollmentOpeningDate = field.error;
  }

  field = validateEnrollmentClosingDate(
    data.enrollmentOpeningDate,
    data.enrollmentClosingDate,
    data.endingDate
  );
  if (!field.isValid) {
    errors.enrollmentClosingDate = field.error;
  }

  field = validateEndingDate(
    data.enrollmentOpeningDate,
    data.enrollmentClosingDate,
    data.endingDate
  );
  if (!field.isValid) {
    errors.endingDate = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

//enrollmentOpeningDate validation####################
export const validateEnrollmentOpeningDate = (
  enrollmentOpeningDate,
  enrollmentClosingDate,
  endingDate
) => {
  enrollmentOpeningDate = !isEmpty(enrollmentOpeningDate)
    ? enrollmentOpeningDate
    : "";
  enrollmentClosingDate = !isEmpty(enrollmentClosingDate)
    ? enrollmentClosingDate
    : "";
  endingDate = !isEmpty(endingDate) ? endingDate : "";

  let { error } = validateDateRequired(enrollmentOpeningDate);

  if (isEmpty(error)) {
    //deve ser antes do encerramento
    if (
      !isEmpty(enrollmentClosingDate) &&
      moment(enrollmentOpeningDate, "YYYY-MM-DD") >
        moment(enrollmentClosingDate, "YYYY-MM-DD")
    ) {
      error = "Início das inscrições após encerramento das inscrições.";
    }

    //deve ser antes do fim da chamada
    if (
      !isEmpty(endingDate) &&
      moment(enrollmentOpeningDate, "YYYY-MM-DD") >
        moment(endingDate, "YYYY-MM-DD")
    ) {
      error = "Início das inscrições após encerramento da chamada.";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//enrollmentClosingDate validation####################
export const validateEnrollmentClosingDate = (
  enrollmentOpeningDate,
  enrollmentClosingDate,
  endingDate
) => {
  enrollmentOpeningDate = !isEmpty(enrollmentOpeningDate)
    ? enrollmentOpeningDate
    : "";
  enrollmentClosingDate = !isEmpty(enrollmentClosingDate)
    ? enrollmentClosingDate
    : "";
  endingDate = !isEmpty(endingDate) ? endingDate : "";

  let { error } = validateDateRequired(enrollmentClosingDate);

  if (isEmpty(error)) {
    //deve ser depois da abertura das inscrições
    if (
      !isEmpty(enrollmentOpeningDate) &&
      moment(enrollmentClosingDate, "YYYY-MM-DD") <
        moment(enrollmentOpeningDate, "YYYY-MM-DD")
    ) {
      error = "Encerramento das inscrições antes da abertura das inscrições.";
    }

    //deve ser antes do fim da chamada
    if (
      !isEmpty(endingDate) &&
      moment(enrollmentClosingDate, "YYYY-MM-DD") >
        moment(endingDate, "YYYY-MM-DD")
    ) {
      error = "Encerramento das inscrições após encerramento da chamada.";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//endingDate validation####################
export const validateEndingDate = (
  enrollmentOpeningDate,
  enrollmentClosingDate,
  endingDate
) => {
  enrollmentOpeningDate = !isEmpty(enrollmentOpeningDate)
    ? enrollmentOpeningDate
    : "";
  enrollmentClosingDate = !isEmpty(enrollmentClosingDate)
    ? enrollmentClosingDate
    : "";
  endingDate = !isEmpty(endingDate) ? endingDate : "";

  let { error } = validateDateRequired(endingDate);

  if (isEmpty(error)) {
    //deve ser depois da abertura das inscrições
    if (
      !isEmpty(enrollmentOpeningDate) &&
      moment(endingDate, "YYYY-MM-DD") <
        moment(enrollmentOpeningDate, "YYYY-MM-DD")
    ) {
      error = "Encerramento da chamada antes da abertura das inscrições.";
    }

    //deve ser depois do encerramento das inscrições
    if (
      !isEmpty(enrollmentClosingDate) &&
      moment(endingDate, "YYYY-MM-DD") <
        moment(enrollmentClosingDate, "YYYY-MM-DD")
    ) {
      error = "Encerramento da chamada antes do encerramento das inscrições.";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
