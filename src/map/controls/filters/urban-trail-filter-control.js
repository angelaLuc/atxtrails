import { MapControl, withLeaflet } from 'react-leaflet';
import FilterElem from './urban-trail-filter-elem';

class FilterControl extends MapControl {
    createLeafletElement (props) {
        return new FilterElem(props);
    }
}

export default withLeaflet(FilterControl);
