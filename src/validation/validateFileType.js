import isEmpty from "./is-empty";

// FileType validation (FileReader object)
export const validateFileType = (fileReader, types) => {
  let error;

  if (!types.includes(fileReader ? fileReader.type : "")) {
    error = "Formato de arquivo inválido";
  }

  if (!fileReader) {
    error = "Documento é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
