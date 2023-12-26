import {Options} from 'ky';
import {ApiError, api} from '..';
import {

  UsersResponse,
} from './ChatType';

enum ChatLink {
  'USER_ALL' = 'user/all',
}


export const getAllUsers = async (
  orderBy: 'asc' | 'desc' = 'asc',
  page: number = 1,
  limit: number = 50,
  searchBy: 'userName' | "email" = 'userName' ,
  searchText: string = ''
): Promise<UsersResponse> => {
  const queryParams = new URLSearchParams({
    orderBy,
    page: page.toString(),
    limit: limit.toString(),
    searchBy,
    searchText,
  });

  const options: Options = {
    method: 'GET',
  };

  const response = await api(
    `${ChatLink.USER_ALL}?${queryParams.toString()}`,
    options
  );

  return response.json();
};
