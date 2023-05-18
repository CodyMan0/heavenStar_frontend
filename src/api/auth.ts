import { LoginRequestType, LoginResultType, RegisterRequestType, RegisterResultType } from 'types/User';
import axios, { AxiosResponse } from 'axios'
import HTTPError from 'network/httpError';

const URL = process.env.REACT_APP_BASE_URL;


export const register = async (
  values: RegisterRequestType
):Promise<AxiosResponse<RegisterResultType, any>> => {
  
  const formData = new FormData();

  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append('picturePath', values.picture.name);
  try {
      const savedUserResponse = await axios.post(`${URL}/auth/register`,formData);
  return savedUserResponse.data

  } catch (error) {
    throw new HTTPError(error.response.status, error.response.data.message).errorMessage;
  }
};

export const login = async (values: LoginRequestType):Promise<AxiosResponse<LoginResultType>> => {
  try{
  const loggedInResponse = await axios.post(`${URL}/auth/login`, JSON.stringify(values),{
    headers: { 'Content-Type': 'application/json' }
    }
  );
  return loggedInResponse.data;
  }
  catch(error){
    throw new HTTPError(error.response.status, error.response.data.message).errorMessage;
  }
};
