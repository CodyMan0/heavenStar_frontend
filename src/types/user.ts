import { Picture } from "./ElementType";

export type LoginRequestType = {
  username: string;
  password: string;
}

export type LoginResultType =
  | {
      token: string;
      user: RegisterRequestType & RegisterResultType;
    }
  | {
      message: string;
    };


export interface RegisterRequestType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture: string & Picture;
  location: string;
  occupation: string;
  [key: string]: string;
}

export interface RegisterResultType {
  picturePath: string;
  friends: string[];
  viewedProfile: number;
  impression: number;
}

