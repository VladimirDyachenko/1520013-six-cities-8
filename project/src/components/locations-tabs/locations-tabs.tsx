import { AvailableCity } from '../../utils/const';

type LocationsTabsProps = {
  selectedLocation: string,
  locations: Array<AvailableCity>,
  onSetLocation: (city: string) => void,
}

function LocationsTabs({selectedLocation, locations, onSetLocation}: LocationsTabsProps): JSX.Element {
  const activeLocationClassList = 'locations__item-link tabs__item tabs__item--active';
  const locationClassList = 'locations__item-link tabs__item';

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {locations.map((location) => (
            <li className='locations__item' key={location}>
              <a
                className={location.toLowerCase() === selectedLocation.toLowerCase() ? activeLocationClassList : locationClassList}
                onClick={() => onSetLocation(location)}
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

export default LocationsTabs;
