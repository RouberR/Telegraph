export type SignUpRequestData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpResponseData = {
  codeExpired: {
    seconds: number;
    milliseconds: number;
  };
};

export type SignInRequestData = {
  email: string
  password: string
};

export type SignInpResponseData = {
  accessToken: string;
};

export type ResendEmailCodeRequest = {
  email: string;
};

export type ResendEmailCodeResponse = {
  codeExpired: {
    seconds: number;
    milliseconds: number;
  };
};

export type ConfirmEmailRequest = {
  email: string;
  code: string;
};

export type ConfirmEmailResponse = {
  accessToken: string;
};
