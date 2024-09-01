const AUTH_TOKEN_KEY_NAME = 'quest-token';

export type Token = string;

export const getToken = (): Token | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token;
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
