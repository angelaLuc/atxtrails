import { Control, DomEvent, DomUtil, LayerGroup } from "leaflet";
import { addClasses, removeClasses } from "../../map-utils";

export default Control.extend({
  options: {
    createButtonCallback: function(container, options) {
      let link = DomUtil.create("a", "filter-control show-cursor", container);
      link.title = options.strings.title;
      link.setAttribute("id", options.filterId);
      let icon = DomUtil.create(options.iconElementTag, options.icon, link);
      return { link: link, icon: icon };
    },
    iconElementTag: "i",
    strings: {
      title: "Toggle Filter Panel"
    },
    icon: "fas fa-filter fa-lg",
    filterId: "trail-name-filter-id"
  },
  onAdd: function(map) {
    let container = DomUtil.create(
      "div",
      "leaflet-bar leaflet-control filter-control"
    );
    this._layer = this.options.layer || new LayerGroup();
    this._layer.addTo(map);

    let linkAndIcon = this.options.createButtonCallback(
      container,
      this.options
    );
    this._link = linkAndIcon.link;
    this._icon = linkAndIcon.icon;

    DomEvent.on(this._link, "click", DomEvent.stopPropagation)
      .on(this._link, "click", DomEvent.preventDefault)
      .on(this._link, "click", this._onClick, this)
      .on(this._link, "dblclick", DomEvent.stopPropagation);
    this.checkForActiveFitler();
    return container;
  },
  checkForActiveFitler: function() {
    if (this.options.selected && this.options.selected !== "Show All") {
      addClasses(this._link, "green-filter-button");
    } else {
      removeClasses(this._link, "green-filter-button");
    }
  },
  _onClick: function(e) {
    this.checkForActiveFitler();
    this.options.onClick();
  }
});
