import { Control, DomUtil, DomEvent } from "leaflet";

export default Control.extend({
  options: {
    className: "leaflet-legend-control show-cursor",
    title: "Map Legend"
  },
  onAdd: function(map) {
    let container = DomUtil.create("div", this.options.className);
    let existing = DomUtil.create("div", "legend-row", container);
    DomUtil.create("i", "legend-color-existing", existing);
    let existingText = DomUtil.create("div", "legend-label", existing);
    existingText.innerHTML = "Existing";
    let proposed = DomUtil.create("div", "legend-row", container);
    DomUtil.create("i", "legend-color-proposed", proposed);
    let proposedText = DomUtil.create("div", "legend-label", proposed);
    proposedText.innerHTML = "Proposed";
    let funded = DomUtil.create("div", "legend-row", container);
    DomUtil.create("i", "legend-color-funded", funded);
    let fundedText = DomUtil.create("div", "legend-label", funded);
    fundedText.innerHTML = "Funded";

    container.title = this.options.title;

    DomEvent.disableClickPropagation(container);

    return container;
  }
});
