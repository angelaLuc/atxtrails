/* eslint-disable new-cap */
import Leaflet, { Control, DomUtil, DomEvent, LayerGroup } from 'leaflet';
import {addClasses, removeClasses} from '../../map-utils';

export default Control.extend({
    options: {
        className: '',
        onOff: '',
        handleOff: function noop () {},
        markerClass: Leaflet.CircleMarker,
        circleStyle: {
            color: '#136AEC',
            fillColor: '#136AEC',
            fillOpacity: 0.15,
            weight: 2,
            opacity: 0.5
        },
        markerStyle: {
            color: '#136AEC',
            fillColor: '#2A93EE',
            fillOpacity: 0.7,
            weight: 2,
            opacity: 0.9,
            radius: 5
        },
        drawCircle: true,
        /** If set, the marker at the users' location is drawn. */
        drawMarker: true,
        locateOptions: {
            maxZoom: Infinity,
            watch: false,
            setView: true
        },
        createButtonCallback: function (container, options) {
            let link = DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single show-cursor', container);
            link.title = options.strings.title;
            let icon = DomUtil.create(options.iconElementTag, options.icon, link);
            return { link: link, icon: icon };
        },
        showPopup: true,
        strings: {
            title: 'Find me',
            metersUnit: 'meters',
            feetUnit: 'feet',
            popup: 'You are here',
            outsideMapBoundsMsg: 'You seem located outside the boundaries of the map'
        },
        icon: 'fas fa-location-arrow fa-lg',
        iconLoading: 'fas fa-sync-alt fa-lg fa-spin',
        /** The element to be created for icons. For example span or i */
        iconElementTag: 'i',
        /** Use metric units. */
        metric: false
    },

    onAdd: function (map) {
        // let _controlDiv = DomUtil.create('div', this.options.className);
        // DomEvent.disableClickPropagation(_controlDiv);
        // DomEvent.on(_controlDiv, 'click', this._onClick, this);
        // return _controlDiv;

        let container = DomUtil.create('div', 'leaflet-control-locate leaflet-bar leaflet-control');

        this._layer = this.options.layer || new LayerGroup();
        this._layer.addTo(map);
        this._event = undefined;
        this._prevBounds = null;

        let linkAndIcon = this.options.createButtonCallback(container, this.options);
        this._link = linkAndIcon.link;
        this._icon = linkAndIcon.icon;

        DomEvent.on(this._link, 'click', DomEvent.stopPropagation)
            .on(this._link, 'click', DomEvent.preventDefault)
            .on(this._link, 'click', this._onClick, this)
            .on(this._link, 'dblclick', DomEvent.stopPropagation);

        this._map.on('unload', this._unload, this);

        return container;
    },

    _deactivate: function () {
        this._map.stopLocate();

        // unbind event listeners
        this._map.off('locationfound', this._onLocationFound, this);
        this._map.off('locationerror', this._onLocationError, this);
    },

    _removeMarker: function () {
        this._layer.clearLayers();
        this._marker = undefined;
        this._circle = undefined;
    },
    stop: function () {
        this._deactivate();
        this._removeMarker();
    },
    _unload: function () {
        this.stop();
        this._map.off('unload', this._unload, this);
    },
    _drawMarker: function (latlng) {
        let radius = 0;

        // circle with the radius of the location's accuracy
        if (this.options.drawCircle) {
            let style = this.options.circleStyle;

            if (!this._circle) {
                this._circle = Leaflet.circle(latlng, radius, style).addTo(this._layer);
            } else {
                this._circle
                    .setLatLng(latlng)
                    .setRadius(radius)
                    .setStyle(style);
            }
        }

        let distance, unit;
        if (this.options.metric) {
            distance = radius.toFixed(0);
            unit = this.options.strings.metersUnit;
        } else {
            distance = (radius * 3.2808399).toFixed(0);
            unit = this.options.strings.feetUnit;
        }

        // small inner marker
        if (this.options.drawMarker) {
            let mStyle = this.options.markerStyle;
            if (!this._marker) {
                this._marker = new this.options.markerClass(latlng, mStyle).addTo(this._layer);
            } else {
                this._marker.setLatLng(latlng);
                // If the markerClass can be updated with setStyle, update it.
                if (this._marker.setStyle) {
                    this._marker.setStyle(mStyle);
                }
            }
        }

        let t = this.options.strings.popup;
        if (this.options.showPopup && t && this._marker) {
            this._marker.bindPopup(Leaflet.Util.template(t, { distance: distance, unit: unit }))._popup.setLatLng(latlng);
        }
    },
    _onLocationFound: function (e) {
        if (e) {
            // console.log(e.latlng);
            this._drawMarker(e.latlng);
            removeClasses(this._icon, this.options.iconLoading);
            addClasses(this._icon, this.options.icon);
        }
    },
    _onLocationError: function (err) {
        console.log('ERR', err);
        removeClasses(this._icon, this.options.iconLoading);
        addClasses(this._icon, this.options.icon);
    },
    _onClick: function (e) {
        this._map.locate(this.options.locateOptions);
        addClasses(this._icon, this.options.iconLoading);
        // bind event listeners
        this._map.on('locationfound', this._onLocationFound, this);
        this._map.on('locationerror', this._onLocationError, this);
    }
});
