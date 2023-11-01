import Map from '../components/Map';
import { MapEntity } from '../components/Map';
import SlideOver from '../components/SlideOver';
import {
  Box,
  Slide,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useState,
} from 'react';

import {
  useConfiguration
} from "../contexts/Configuration"
import { useMobileApi } from 'common/MobileApi';

export interface Signal {
  _id: string,
  signaler: string,
  created_at: string,
  last_updated_at: string,
  verified: boolean,
  lat: number,
  lng: number,
}


const SignalsPage = () => {
  const conf = useConfiguration()
  const mobileApi = useMobileApi(conf)

  const [signalInfos, setSignalInfos] = useState<Signal>({
    _id: '',
    signaler: '',
    created_at: '',
    last_updated_at: '',
    verified: false,
    lat: 0,
    lng: 0,
  });
  const { isOpen, onToggle } = useDisclosure();

  async function refreshAllSignals(): Promise<MapEntity[]> {
    const unformattedSignals: Signal[] = (await mobileApi.getAllSignals()).data;
    const mapEntities: MapEntity[]
      = unformattedSignals.map((e: Signal) => {
        const latitude = e.lat;
        const longitude = e.lng;

        return { id: e._id, latitude, longitude }
      })

    return mapEntities;
  }

  // TODO : move into new API function
  async function getSignalWithId(id: string): Promise<Signal> {
    const unformattedSignals: Signal[] = (await mobileApi.getAllSignals()).data;
    const signal = unformattedSignals.find((e) => e._id = id);

    if (signal === undefined)
      throw new Error(`could not find signal with id ${id}`)
    return signal;
  }

  return (
    <Box h="100%">
      <Map onRefresh={refreshAllSignals} onMarkerClick={
        (e) => getSignalWithId(e.id)
          .then((s) => setSignalInfos(s))
          .then(() => onToggle())
      } />
      <Slide direction='right' in={isOpen} style={{ zIndex: 20 }}>
        <SlideOver signal={signalInfos} setShow={onToggle} />
      </Slide>
    </Box>
  )
};

export default SignalsPage;
