export type LoginErrorObjectType = {
  general?: string;
  register?: string;
  password?: string;
};

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
