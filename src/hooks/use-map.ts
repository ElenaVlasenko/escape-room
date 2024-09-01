import { useEffect, useState, MutableRefObject, useRef, EffectCallback } from 'react';
import { LatLngLiteral, Map, TileLayer } from 'leaflet';

type Params = {
  center: LatLngLiteral;
  zoom: number;
}

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  { center, zoom }: Params
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const effectCallback: EffectCallback = () => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(
        mapRef.current,
        {
          center,
          zoom
        }
      );

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    } else {
      map?.panTo(center);
    }
  };

  useEffect(effectCallback, [mapRef, map, center]);

  return map;
}

export default useMap;
