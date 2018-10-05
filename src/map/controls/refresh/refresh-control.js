import { MapControl, withLeaflet } from 'react-leaflet';
import RefreshElem from './refresh-elem';

class RefreshControl extends MapControl {
    createLeafletElement (props) {
        return new RefreshElem(props);
    }
}

export default withLeaflet(RefreshControl);
