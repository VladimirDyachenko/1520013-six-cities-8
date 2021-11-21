import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { GeoLocation } from '../../types/geo-location';
import { Offer } from '../../types/offer';
import { Marker, Icon, PointExpression } from 'leaflet';
import { defaultMapIcon, selectedMapIcon} from '../../utils/const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: GeoLocation;
  offers: Offer[];
  activeOfferId?: number | undefined;
  className?: string;
};

const defaultIcon = new Icon({
  iconUrl: defaultMapIcon.iconUrl,
  iconSize: defaultMapIcon.iconSize as PointExpression,
  iconAnchor: defaultMapIcon.iconAnchor as PointExpression,
});

const activeIcon = new Icon({
  iconUrl: selectedMapIcon.iconUrl,
  iconSize: selectedMapIcon.iconSize as PointExpression,
  iconAnchor: selectedMapIcon.iconAnchor as PointExpression,
});

function Map({city, offers, activeOfferId, className}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const [map, markerLayer] = useMap(mapRef, city);

  useEffect(() => {
    if (map && markerLayer) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        const markerStyle = activeOfferId === offer.id ? activeIcon : defaultIcon;

        marker
          .setIcon(markerStyle)
          .addTo(markerLayer);

      });
    }
    return () => {
      markerLayer?.clearLayers();
    };
  }, [map, offers, activeOfferId, markerLayer]);

  return (
    //TODO убрать тернарный оператор
    <section className={`${className ? className : 'cities__map'} map`} ref={mapRef}></section>
  );
}

export default Map;
