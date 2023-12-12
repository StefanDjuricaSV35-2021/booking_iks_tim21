export interface User {
  id?: number;
  role?: Role;
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  country?: string;
  city?: string;
  street?: string;
  phone?: string;
  enabled?: boolean;
}

export enum Role {
  ADMIN,
  GUEST,
  OWNER,
}
