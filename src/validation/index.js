//Commom validations
export { default as isEmpty } from "./is-empty.js";
export { validateName } from "./validateName.js";
export { validateSurname } from "./validateSurname.js";
export { validateCpf, validateCpfRequired } from "./validateCpf.js";
export { validateEmail, validateEmailRequired } from "./validateEmail.js";
export { validatePassword, validatePasswordCheck } from "./validatePassword.js";
export {
  validateDate,
  validateDateRequired,
  validateYearRequired
} from "./validateDate.js";
export { validateProcessNumber } from "./validateProcessNumber";
export { validateDescription } from "./validateDescription";
export { validateNumberRequired } from "./validateNumber";

//Form Validations
export { validateRegisterForm } from "./validateRegisterForm";
export { validateProfileEditUserForm } from "./validateProfileEditUserForm";
export { validateProfileEditPersonForm } from "./validateProfileEditPersonForm";
export { validateProcessForm } from "./validateProcessForm";
export { validateProcessCallForm } from "./validateProcessCallForm";
