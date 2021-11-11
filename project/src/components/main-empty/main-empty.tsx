import { connect, ConnectedProps } from 'react-redux';
import { getSelectedCity } from '../../store/offers-list/selectors';
import { State } from '../../types/store/state';
import LocationsTabs from '../locations-tabs/locations-tabs';

const mapStateToProps = (state: State) => ({
  selectedCity: getSelectedCity(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function MainEmpty(props: ConnectedComponentProps): JSX.Element {
  const { selectedCity } = props;

  return (
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <LocationsTabs/>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {selectedCity}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  );
}

export { MainEmpty };
export default connector(MainEmpty);
