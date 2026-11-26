import {  UserRegisterI, ValidationError } from "@/types/Auth";

export const validateRegister = (
  values: UserRegisterI
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!values.name.trim()) {
    errors.push({
      field: "name",
      message: "Name is required",
    });
  } else if (values.name.trim().length < 2) {
    errors.push({
      field: "name",
      message: "Name must contain at least 2 characters",
    });
  }

  if (!values.email.trim()) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  if (!values.password) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  } else if (values.password.length < 8) {
    errors.push({
      field: "password",
      message: "Password must contain at least 8 characters",
    });
  }

  return errors;
};