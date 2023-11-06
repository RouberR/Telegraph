import {Options} from 'ky';
import {ApiError, api} from '..';
import {
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  ResendEmailCodeRequest,
  ResendEmailCodeResponse,
  SignInRequestData,
  SignInpResponseData,
  SignUpRequestData,
  SignUpResponseData,
} from './AuthType';

enum AuthLink {
  'SIGN_UP' = 'auth/sign-up',
  'SIGN_IN' = 'auth/sign-in',
  "RESEND_CODE" = 'auth/new-code',
  "EMAIL_CONFIRM" = "auth/confirm"
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

export const resendEmailCode = async (
  data: ResendEmailCodeRequest,
): Promise<ResendEmailCodeResponse> => {
  const options: Options = {
    method: 'POST',
    json: data,
  };
  const response = await api(
    AuthLink.RESEND_CODE,
    options,
  ).json<ResendEmailCodeResponse>();
  return response;
};


export const confirmEmail = async (
  data: ConfirmEmailRequest,
): Promise<ConfirmEmailResponse> => {
  const options: Options = {
    method: 'POST',
    json: data,
  };
  const response = await api(
    AuthLink.EMAIL_CONFIRM,
    options,
  ).json<ConfirmEmailResponse>();
  return response;
};


