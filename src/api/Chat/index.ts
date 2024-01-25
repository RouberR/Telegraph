import { Options } from 'ky';

import { api } from '..';
import { ChatResponse, CreateChatData, UsersResponse } from './ChatType';

enum ChatLink {
  'USER_ALL' = 'user/all',
  'CHAT' = 'chat',
}

export const getAllUsers = async (
  orderBy: 'asc' | 'desc' = 'asc',
  page = 1,
  limit = 50,
  searchBy: 'userName' | 'email' = 'userName',
  searchText = ''
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

  const response = await api(`${ChatLink.USER_ALL}?${queryParams.toString()}`, options);

  return response.json();
};

export const createChat = async (data: CreateChatData): Promise<ChatResponse> => {
  const options: Options = {
    method: 'POST',
    json: data,
  };
  const response = await api(ChatLink.CHAT, options);

  return response.json();
};

export const deleteChat = async (id: string) => {
  const options: Options = {
    method: 'DELETE',
  };
  const response = await api(`${ChatLink.CHAT}/${id}`, options);
  return response;
};

export const getChat = async (id: string): Promise<ChatResponse> => {
  const options: Options = {
    method: 'GET',
  };
  const response = await api(`${ChatLink.CHAT}/${id}`, options);
  return response.json();
};
