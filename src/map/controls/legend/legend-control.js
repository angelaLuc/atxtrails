import { MapControl, withLeaflet } from "react-leaflet";
import LegendElem from "./legend-elem";

class LegendControl extends MapControl {
  createLeafletElement(props) {
    return new LegendElem(props);
  }
}

export default withLeaflet(LegendControl);
