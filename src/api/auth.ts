import { LoginRequest, RegisterRequest, RegisterRestResult } from 'types/user';

type RegisterResult = RegisterRequest & RegisterRestResult;

export type LoginResult =
  | {
      token: string;
      user: RegisterResult;
    }
  | {
      message: string;
    };
const URL = process.env.REACT_APP_BASE_URL;

export const register = async (
  values: RegisterRequest
): Promise<RegisterResult> => {
  const formData = new FormData();

  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append('picturePath', values.picture.name);

  const savedUserResponse = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    body: formData,
  });

  const enrollment = savedUserResponse.json();
  return enrollment;
};

export const login = async (values: LoginRequest): Promise<LoginResult> => {
  const loggedInResponse = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  const loggedIn = await loggedInResponse.json();

  return loggedIn;
};
