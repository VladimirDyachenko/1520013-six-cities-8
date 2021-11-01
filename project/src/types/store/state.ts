import { Offer } from '../offer';

export type State = {
  cityName: string;
  offers: Offer[];
  isDataLoaded: boolean;
}
