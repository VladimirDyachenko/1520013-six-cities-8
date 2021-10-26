import { Dispatch, useState, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ApartmentCardsList from '../../apartment-cards-list/apartment-cards-list';
import Header from '../../header/header';
import Map from '../../map/map';
import LocationsTabs from '../../locations-tabs/locations-tabs';
import { State } from '../../../types/store/state';
import { Actions } from '../../../types/store/actions';
import { setCity } from '../../../store/action';
import { AvailableCity } from '../../../utils/const';

const mapStateToProps = ({cityName, offers}: State) => ({
  cityName,
  offers,
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
  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name.toLowerCase() === cityName.toLocaleLowerCase()),
    [offers, cityName],
  );

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
              <form className='places__sorting' action='#' method='get'>
                <span className='places__sorting-caption'>Sort by</span>
                <span className='places__sorting-type' tabIndex={0}>
                    Popular
                  <svg className='places__sorting-arrow' width='7' height='4'>
                    <use xlinkHref='#icon-arrow-select'></use>
                  </svg>
                </span>
                <ul className='places__options places__options--custom places__options--opened'>
                  <li
                    className='places__option places__option--active'
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className='places__option' tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className='places__option' tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className='places__option' tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
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
