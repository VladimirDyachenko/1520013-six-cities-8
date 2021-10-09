import { useState } from 'react';
import { Offer } from '../../types/offer';
import ApartmentCard from '../apartment-card/apartment-card';

type ApartmentCardsListProps = {
  offers: Offer[];
}

function ApartmentCardsList({offers}: ApartmentCardsListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState<number>();

  return (
    <div className='cities__places-list places__list tabs__content'>
      {offers.map((offer) => (
        <ApartmentCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(id: number) => setActiveOffer(id)}
        />))}
    </div>
  );
}

export default ApartmentCardsList;
