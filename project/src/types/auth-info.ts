export type PublicAuthInfo = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type PrivateAuthInfo = PublicAuthInfo & {
  email: string,
  token: string;
};
