import { Offer } from '../../types/offer';
import ApartmentCard from '../apartment-card/apartment-card';

type ApartmentCardsListProps = {
  offers: Offer[];
  setActiveOfferId: (id: number) => void;
};

function ApartmentCardsList({
  offers,
  setActiveOfferId,
}: ApartmentCardsListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <ApartmentCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(id: number) => setActiveOfferId(id)}
        />
      ))}
    </div>
  );
}

export default ApartmentCardsList;
