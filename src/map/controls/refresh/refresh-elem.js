import { Control, DomUtil, DomEvent, LayerGroup } from "leaflet";

export default Control.extend({
  options: {
    createButtonCallback: function(container, options) {
      let link = DomUtil.create("a", "show-cursor", container);
      link.title = options.strings.title;
      link.setAttribute("data-testid", options.testId);
      let icon = DomUtil.create(options.iconElementTag, options.icon, link);
      return { link: link, icon: icon };
    },
    iconElementTag: "i",
    strings: {
      title: "Reset"
    },
    icon: "fas fa-sync-alt fa-lg",
    testId: "refresh-map-control"
  },
  onAdd: function(map) {
    let container = DomUtil.create(
      "div",
      "leaflet-bar leaflet-control refresh-control"
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
      .on(this._link, "click", this.options.onClick, this)
      .on(this._link, "dblclick", DomEvent.stopPropagation);

    return container;
  }
});
