export interface LoginRequest {
  username: string;
  password: string;
}
export interface Picture {
  path: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture: string & Picture;
  location: string;
  occupation: string;
  [key: string]: string;
}

export interface RegisterRestResult {
  picturePath: string;
  friends: string[];
  viewedProfile: number;
  impression: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
