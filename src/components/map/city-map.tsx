import { useRef, useEffect } from 'react';
import { Icon, LatLngLiteral, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from './const';

export type Point = LatLngLiteral & {
  id: string;
}

type MapProps = {
  points: Point[];
  selectedPointId: string | undefined;
  onPointClick: (id: string) => void;
  zoom: number;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

function CityMap(props: MapProps): JSX.Element {
  const { points, selectedPointId, onPointClick, zoom } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, { center: points[0], zoom });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      // revers добавлен, т.к. сервер присылает одинаковые координаты для 2х маркеров и это вызывает перекрытие активного маркера пассивным
      const selectedPoint = [...points.reverse()].find((point) => point.id === selectedPointId);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer)
          .on('click', () => onPointClick(point.id));
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId, onPointClick]);

  return (<section className="map" ref={mapRef}></section>);
}

export default CityMap;
