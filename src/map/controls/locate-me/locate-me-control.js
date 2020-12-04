import { MapControl, withLeaflet } from 'react-leaflet';
import LocateMe from './locate-me-elem';

class LocateMeControl extends MapControl {
    createLeafletElement (props) {
        return new LocateMe(props);
    }
}

export default withLeaflet(LocateMeControl);
