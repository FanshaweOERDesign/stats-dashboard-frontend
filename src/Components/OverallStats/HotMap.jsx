import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HotMap = ({ referrers }) => {
  if (!referrers || Object.keys(referrers).length === 0) {
    return <p>No referer data available</p>;
  }

  const refererLocations = Object.entries(referrers)
    .filter(([key, value]) => value.loc && value.loc.lat && value.loc.lon)
    .map(([key, value]) => ({
      name: key,
      lat: parseFloat(value.loc.lat),
      lon: parseFloat(value.loc.lon),
      city: value.loc.city,
      views: value.views,
      visitors: value.visitors,
    }));

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '80%', margin: 'auto', borderRadius: '2em', marginBottom: '10px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {refererLocations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lon]}>
          <Popup>
            <div>
              <strong>{loc.name}</strong>
              <br />
              City: {loc.city}
              <br />
              Views: {loc.views}
              <br />
              Visitors: {loc.visitors}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HotMap;
