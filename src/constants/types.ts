// for user and role

export type Permission = {
  id?: string;
  name?: string;
};

export type Role = {
  id: string;
  name: string;
  label: string | null;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  dateOfBirth: string | null;
  roles: Role[];
  employer: unknown | null;
  employeeId?: string; // Add employeeId to UserType
};
