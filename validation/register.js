import Validator from "validator";

/**
 *
 * @param {object} data Data as object
 * @returns {object} validate register input will return a object of error and isvalid
 */
export const validateRegisterInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = data.name ?? "";
  data.email = data.email ?? "";
  data.password = data.password ?? "";
  data.password2 = data.password2 ?? "";

  //Name checks
  if (Validator.isEmail(data.name)) {
    errors.name = "Name field is required";
  }

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

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: errors ? true : false,
  };
};
