export type AuthDisplayStoreType = {
  show: boolean;
  toggle: (value?: boolean) => void;
};

export type AuthStore = {
  isLogin: boolean;
  verificationModal: boolean;
  accessToken: string;
  form: FormTypeLogin | FormTypeSignup;
  setVerificationModal: (value: boolean) => void;
  setErrorMessage: (msg: string) => void;
  setSuccessMessage: (msg: string) => void;
  login: (form: FormTypeLogin) => Promise<void>;
  signup: (form: FormTypeSignup) => Promise<void>;
  refreshAccessToken: (refreshToken: string) => Promise<string>;
};

// children types of Auth :
export type FormTypeSignup = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  success: string;
};
export type FormTypeLogin = {
  username: string;
  password: string;
  error: string;
  success: string;
};
