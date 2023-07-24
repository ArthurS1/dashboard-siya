import {
  MapContainer,
  TileLayer,
  Marker,
} from 'react-leaflet';
import {
  LatLng,
  Icon,
} from 'leaflet';
import {
  Button,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';

export interface MapEntity {
  id: string,
  latitude: number,
  longitude: number,
}

const defaults = {
  position: new LatLng(46.227638, 2.213749),
  zoom: 7,
  style: {
    width: '100vw',
    height: '100%',
    zIndex: 0
  },
  marker: new Icon({
    iconUrl: "marker.png",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
    shadowUrl: "marker-shadow.png",
    shadowSize: [48, 48],
    shadowAnchor: [24, 48]
  }),
}

const Map = ({ onRefresh, onMarkerClick}: {
  onRefresh: () => Promise<MapEntity[]>,
  onMarkerClick: (s: MapEntity) => void,
}) => {
  const [signals, setSignals] = useState<MapEntity[]>([])
  const onRefreshWrapper = () => onRefresh().then((e) => setSignals(e));
  const leafletSignals =
    signals.map((signal) =>
      <Marker
        key={signal.id}
        position={new LatLng(signal.latitude, signal.longitude)}
        icon={defaults.marker}
        eventHandlers={{
          click: (_) => onMarkerClick(signal)
        }}
      />
    )

  return (
    <Box h="100%">
      <Button
        position="fixed"
        zIndex={10}
        margin={2}
        right={0}
        onClick={() => onRefreshWrapper()}
        colorScheme="pink"
      >Rafraichir</Button>
      <MapContainer
        center={defaults.position}
        zoom={defaults.zoom}
        style={defaults.style}
        scrollWheelZoom={true}
      >
        <TileLayer attribution='&copy;
          <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap
          </a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {leafletSignals}
      </MapContainer>
    </Box>
  )
}

export default Map;
