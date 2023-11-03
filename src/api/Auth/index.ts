import {Options} from 'ky';
import {ApiError, api} from '..';
import {
  SignInRequestData,
  SignInpResponseData,
  SignUpRequestData,
  SignUpResponseData,
} from './AuthType';

enum AuthLink {
  'SIGN_UP' = 'auth/sign-up',
  'SIGN_IN' = 'auth/sign-in',
}



export const authSignUp = async (
  data: SignUpRequestData,
): Promise<SignUpResponseData> => {
  const options: Options = {
    method: 'POST',
    json: data,
  };
  const response = await api(
    AuthLink.SIGN_UP,
    options,
  ).json<SignUpResponseData>();

  return response;
};

export const authSignIn = async (
  data: SignInRequestData,
): Promise<SignInpResponseData> => {
    const options: Options = {
      method: 'POST',
      json: data,
    };
    const response = await api(
      AuthLink.SIGN_IN,
      options,
    ).json<SignInpResponseData>();
    return response;
  
};
