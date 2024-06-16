import { ProfileFormSubmitType } from "@/routes/_portal.profile";

export type LoginErrorObjectType = {
  general?: string;
  register?: string;
  password?: string;
};

export type ProfileFormErrorType = Partial<{
  general: string;
  community: string;
  currentState: string;
  fatherState: string;
  motherState: string;
}>;

export interface LoginData {
  register: string;
  password: string;
  agree: string;
}

export const validateLogin = (data: LoginData) => {
  const errors: LoginErrorObjectType = {};

  if (!(Object.keys(data).length > 0)) {
    errors.general = "Data parameters not present!";
  }

  if (String(data.register).length !== 11) {
    errors.register = "Invalid register number";
  }

  if (!data.password) {
    errors.password = "Invalid password";
  }

  return errors;
};

export const validateProfileData = (data: ProfileFormSubmitType) => {
  const errors: ProfileFormErrorType = {};

  if (!(Object.keys(data).length > 0)) {
    errors.general = "Data paramters not found!";
  }

  if (String(data.community) === "select") {
    errors.community = "Invalid Community";
  }

  if (String(data.currentState) === "select") {
    errors.currentState = "Invalid Current address state";
  }

  if (String(data.permanentState) === "select") {
    errors.currentState = "Invalid Permanent address state";
  }

  if (String(data.fatherState) === "select") {
    errors.fatherState = "Invalid father address state";
  }

  if (String(data.motherState) === "select") {
    errors.motherState = "Invalid mother address state";
  }

  return errors;
};
