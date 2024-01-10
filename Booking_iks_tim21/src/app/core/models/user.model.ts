export interface User {
  id: number;
  role: Role;
  email?: string | null;
  password?: string | null;
  name?: string | null;
  surname?: string | null;
  country?: string | null;
  city?: string | null;
  street?: string | null;
  phone?: string | null;
  enabled?: boolean;
  blocked?: boolean;
}

export enum Role {
  ADMIN,
  GUEST,
  OWNER,
}
