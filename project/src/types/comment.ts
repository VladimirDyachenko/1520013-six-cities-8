import { PublicAuthInfo } from './auth-info';

export type Comment = {
  id: number;
  comment: string;
  rating: number;
  date: string;
  user: PublicAuthInfo;
}
