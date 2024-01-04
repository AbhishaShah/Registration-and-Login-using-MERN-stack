import Validator from "validator";

/**
 *
 * @param {object} data Request body object
 * @returns {object}
 */
export const validateLoginInput = (data) => {
  let errors = {};

  data.email = data.email ?? "";
  data.password = data.password ?? "";

  //Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: errors ? true : false,
  };
};
