import { isEmpty, validateName, validateDateRequired, validateFileType } from "validation/";

export const validatePublicationForm = (data, options) => {
  let errors = {};
  let field = {};

  field = validateDateRequired(data.date);
  if (!field.isValid) {
    errors.creation_date = field.error;
  }

  // field = validateName(data.name);
  // if (!field.isValid) {
  //   errors.name = field.name;
  // }

  field = validateName(data.selectiveProcess_id);
  if (!field.isValid) {
    errors.selectiveProcess_id = field.error;
  }

  field = validateName(data.publicationType_id);
  if (!field.isValid) {
    errors.publicationType_id = field.error;
  }

  if (!(options && options.verifyFile === false)) {
    field = validateFileType(data.file, ["application/pdf"]);
    if (!field.isValid) {
      errors.file = field.error;
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
