import { Offer } from '../../types/offer';
import ApartmentCard from '../apartment-card/apartment-card';

type ApartmentCardsListProps = {
  offers: Offer[];
  onSetActiveOfferId: (id: number) => void;
};

function ApartmentCardsList({
  offers,
  onSetActiveOfferId,
}: ApartmentCardsListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <ApartmentCard
          key={offer.id}
          offer={offer}
          onSetActiveOfferId={onSetActiveOfferId}
        />
      ))}
    </div>
  );
}

export default ApartmentCardsList;
