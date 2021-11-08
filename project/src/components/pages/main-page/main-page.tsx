import { Dispatch, useState, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ApartmentCardsList from '../../apartment-cards-list/apartment-cards-list';
import Header from '../../header/header';
import Map from '../../map/map';
import LocationsTabs from '../../locations-tabs/locations-tabs';
import SortForm from '../../sort-form/sort-form';
import { State } from '../../../types/store/state';
import { Actions } from '../../../types/store/actions';
import { setCity } from '../../../store/action';
import { AvailableCity, offersSortOptions } from '../../../utils/const';
import { IOfferSortOption } from '../../../types/offer';
import { getOffersForCity } from '../../../store/offers-data/selectors';
import { getSelectedCity } from '../../../store/offers-list/selectors';

const mapStateToProps = (state: State) => ({
  cityName: getSelectedCity(state),
  offers: getOffersForCity(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSetCity(city: string) {
    dispatch(setCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

const availableCities = Object.values(AvailableCity);

function MainPage(props: ConnectedComponentProps): JSX.Element {
  const {offers, cityName, onSetCity} = props;
  const [activeOfferId, setActiveOfferId] = useState<number>();
  const [selectedSort, setSelectedSort] = useState(offersSortOptions[0]);
  const filteredOffers = useMemo(
    () => offers.sort(selectedSort.sortFunction),
    [offers, selectedSort],
  );

  const handleSortingChange = (sortOption: IOfferSortOption) => {
    setSelectedSort(sortOption);
  };

  return (
    <div className='page page--gray page--main'>
      <Header/>
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationsTabs
          locations={availableCities}
          selectedLocation={cityName}
          onSetLocation={onSetCity}
        />
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{filteredOffers.length} places to stay in {cityName}</b>
              <SortForm
                sortOptions={offersSortOptions}
                selectedOption={selectedSort}
                handleChange={handleSortingChange}
              />
              <ApartmentCardsList offers={filteredOffers} setActiveOfferId={setActiveOfferId}/>
            </section>
            <div className='cities__right-section'>
              <Map
                activeOfferId={activeOfferId}
                offers={filteredOffers}
                city={
                  {
                    latitude: 52.3909553943508,
                    longitude: 4.85309666406198,
                    zoom: 10,
                  }
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };
export default connector(MainPage);
