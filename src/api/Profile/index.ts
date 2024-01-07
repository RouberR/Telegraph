import {Options} from 'ky';
import { api} from '..';
import { UpdateUserRequest, UserProfile } from './ProfileType';

enum ProfileLink {
  'USER_PROFILE' = 'user-profile',
  'USER_PROFILE_UPDATE' = 'user-profile/update',
}

export const getUser = async () => {
  const options: Options = {
    method: 'GET',
  };
  const response = await api(ProfileLink.USER_PROFILE, options);
  return response.json();
};

export const deleteUser = async () => {
  const options: Options = {
    method: 'DELETE',
  };
  const response = await api(ProfileLink.USER_PROFILE, options);
  return response;
};

export const updateUser = async (formData: FormData): Promise<UserProfile> => {
  const options: Options = {
    method: 'PATCH',
    body: formData,
    // json: formData,
  };
  const response = await api(ProfileLink.USER_PROFILE_UPDATE, options);
  return response.json();
};
