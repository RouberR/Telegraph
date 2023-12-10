
export type UserProfile = {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string;
  avatarUrl: string;
};

export type UpdateUserRequest= {
  firstName?: string;
  lastName?: string;
  password?: string;
  file?: string
}