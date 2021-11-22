import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ApartmentCardsList from '../../apartment-cards-list/apartment-cards-list';
import Header from '../../header/header';
import Map from '../../map/map';
import LocationsTabs from '../../locations-tabs/locations-tabs';
import SortForm from '../../sort-form/sort-form';
import MainEmpty from '../../main-empty/main-empty';
import { State } from '../../../types/store/state';
import { offersSortOptions } from '../../../utils/const';
import { getOffersForCity } from '../../../store/offers-data/selectors';
import { getSelectedCity, getSelectedSort } from '../../../store/offers-list/selectors';
import { ThunkAppDispatch } from '../../../types/store/actions';
import { setOfferSort } from '../../../store/action';
import { OfferSortOptionName } from '../../../types/offer';

const mapStateToProps = (state: State) => ({
  cityName: getSelectedCity(state),
  offers: getOffersForCity(state),
  selectedSort: getSelectedSort(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setSelectedSort(sortOptionName: OfferSortOptionName) {
    dispatch(setOfferSort(sortOptionName));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function MainPage(props: ConnectedComponentProps): JSX.Element {
  const { offers, cityName, selectedSort, setSelectedSort } = props;
  const [activeOfferId, setActiveOfferId] = useState<number>();

  const handleSortingChange = (sortOptionName: string) => {
    setSelectedSort(sortOptionName as OfferSortOptionName);
  };

  return (
    <div className='page page--gray page--main'>
      <Header/>
      {offers.length > 0
        ? (
          <main className='page__main page__main--index'>
            <h1 className='visually-hidden'>Cities</h1>
            <LocationsTabs/>
            <div className='cities'>
              <div className='cities__places-container container'>
                <section className='cities__places places'>
                  <h2 className='visually-hidden'>Places</h2>
                  <b className='places__found'>{offers.length} places to stay in {cityName}</b>
                  <SortForm
                    sortOptions={offersSortOptions.map((option) => option.name)}
                    selectedOption={selectedSort}
                    handleChange={handleSortingChange}
                  />
                  <ApartmentCardsList offers={offers} setActiveOfferId={setActiveOfferId}/>
                </section>
                <div className='cities__right-section'>
                  <Map
                    activeOfferId={activeOfferId}
                    offers={offers}
                    city={offers[0].city.location}
                  />
                </div>
              </div>
            </div>
          </main>
        ) : <MainEmpty/>}
    </div>
  );
}

export { MainPage };
export default connector(MainPage);
