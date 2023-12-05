export interface User {
  id?: number;
  type: UserType;
  email: string;
  password: string;
  name: string;
  surname: string;
  country: string;
  city: string;
  street: string;
  phone: string;
}

export enum UserType {
  ADMIN,
  GUEST,
  OWNER,
}
