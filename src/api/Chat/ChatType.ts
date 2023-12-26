export type  UsersData =  {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  updatedAt: string;
  avatarUrl: string;
}

export type UsersResponse =  {
  data: UsersData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    offset: number;
  };
}