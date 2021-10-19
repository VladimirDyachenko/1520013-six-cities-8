import { useRef } from 'react';
import { GeoLocation } from '../../types/geo-location';
import { Offer } from '../../types/offer';

type MapProps = {
  city: GeoLocation;
  offers: Offer[];
  activeOfferId: number | undefined;
};

function Map({city, offers, activeOfferId}: MapProps): JSX.Element {

  const mapRef = useRef(null);

  return (
    <section className='cities__map map' ref={mapRef}></section>
  );
}

export default Map;
