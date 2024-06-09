type LoginErrorObjectType = {
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

  if (String(data.register) !== "123") {
    errors.register = "Invalid register number";
  }

  if (String(data.password)?.length !== 3) {
    errors.password = "Invalid password";
  }

  return errors;
};
