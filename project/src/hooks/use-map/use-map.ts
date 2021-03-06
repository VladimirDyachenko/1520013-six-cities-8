import { MutableRefObject, useEffect, useState } from 'react';
import { GeoLocation } from '../../types/geo-location';
import { Map, TileLayer, LayerGroup } from 'leaflet';
import usePrefersReducedMotion from '../use-prefers-reduced-motion/use-prefers-reduced-motion';

function useMap (
  mapRef: MutableRefObject<HTMLElement | null>,
  mapCenter: GeoLocation,
): [ Map | null, LayerGroup | null] {
  const [map, setMap] = useState<Map | null>(null);
  const [markerLayer, setMarkerLayer] = useState<LayerGroup | null>(null);
  const [prefersReducedMotion] = usePrefersReducedMotion();

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: mapCenter.latitude,
          lng: mapCenter.longitude,
        },
        zoom: mapCenter.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );
      instance.addLayer(layer);

      const tempMarkerLayer = new LayerGroup();
      setMarkerLayer(tempMarkerLayer);
      instance.addLayer(tempMarkerLayer);

      setMap(instance);
    }
  }, [mapRef, map, mapCenter]);

  useEffect(() => {
    if (map !== null) {
      map.flyTo(
        {
          lat: mapCenter.latitude,
          lng: mapCenter.longitude,
        },
        mapCenter.zoom,
        {
          animate: !prefersReducedMotion,
        },
      );
    }
  }, [map, mapCenter, prefersReducedMotion]);

  return [map, markerLayer];
}

export default useMap;
