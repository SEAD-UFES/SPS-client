//Commom validations
export { default as isEmpty } from "./is-empty.js";
export { validateName } from "./validateName.js";
export { validateId } from "./validateId.js";
export { validateSurname } from "./validateSurname.js";
export { validateCpf, validateCpfRequired } from "./validateCpf.js";
export { validateEmail, validateEmailRequired } from "./validateEmail.js";
export { validatePassword, validatePasswordCheck } from "./validatePassword.js";
export { validateDate, validateDateRequired, validateYearRequired } from "./validateDate.js";
export { validateProcessNumber } from "./validateProcessNumber";
export { validateDescription } from "./validateDescription";
export { validateNumberRequired } from "./validateNumber";
export { validateFileType } from "./validateFileType";

//Form Validations
export { validateRegisterForm } from "./formValidation/validateRegisterForm";
export { validateProfileEditUserForm } from "./formValidation/validateProfileEditUserForm";
export { validateProfileEditPersonForm } from "./formValidation/validateProfileEditPersonForm";
export { validateProcessForm } from "./formValidation/validateProcessForm";
export {
  validateStepForm,
  validateStepType_id,
  validateResultDate,
  validateOpenAppealDate,
  validateLimitAppealDate,
  validateResultAfterAppealDate
} from "../components/step/validateStepForm";
export { validateAssignment_id, validateProcessCallVacancyForm } from "./formValidation/validateProcessCallVacancyForm";
