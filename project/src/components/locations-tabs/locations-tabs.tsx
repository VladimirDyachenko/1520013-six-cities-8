import { Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setCity } from '../../store/action';
import { getSelectedCity } from '../../store/offers-list/selectors';
import { Actions } from '../../types/store/actions';
import { State } from '../../types/store/state';
import { AvailableCity } from '../../utils/const';

const availableCities = Object.values(AvailableCity);

const mapStateToProps = (state: State) => ({
  selectedCity: getSelectedCity(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSetCity(city: string) {
    dispatch(setCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;


function LocationsTabs(props: ConnectedComponentProps): JSX.Element {
  const {selectedCity, onSetCity} = props;

  const activeLocationClassList = 'locations__item-link tabs__item tabs__item--active';
  const locationClassList = 'locations__item-link tabs__item';

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {availableCities.map((location) => (
            <li className='locations__item' key={location}>
              <a
                className={location.toLowerCase() === selectedCity.toLowerCase() ? activeLocationClassList : locationClassList}
                onClick={() => onSetCity(location)}
                href='#temp'
              >
                <span>{location}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { LocationsTabs };
export default connector(LocationsTabs);
