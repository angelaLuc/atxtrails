import React, { createRef } from 'react';
import { init, toggleFilterShow } from './trail-state-functions';
import { getUrbanTrails } from '../api/trails';
import { getBuildStatColor, getFilters, getHomeCoordinatesFromData, urbanTrailTransform } from './trail-utils';
import { GeoJSON, Map, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import TrailCard from './trail-data-card';
import { convertLatLng } from '../core/app-utils';
import LegendControl from '../map/controls/legend/legend-control';
import FilterControl from '../map/controls/filters/urban-trail-filter-control';
import TrailFilterPanel from './trail-filter-panel';
import axios from 'axios/index';
import RefreshControl from '../map/controls/refresh/refresh-control';

const CancelToken = axios.CancelToken;
const cancelUT = CancelToken.source();

class UrbanTrails extends React.Component {
    constructor () {
        super();
        this.state = init();
        this.onEachFeature = this.onEachFeature.bind(this);
        this.handleToggleFilter = this.handleToggleFilter.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    messages = {
        NO_DATA_FOUND: 'No data found',
        NETWORK_ERROR: 'Unable to retrieve trail data at this time, please try again later.',
        LOADING_DATA: 'Loading data...'
    };

    mapConfig = {
        center: [30.3074624, -98.0335928],
        zoom: 11,
        maxZoom: 18
    };

    mapRef = createRef();

    getStyle (feature) {
        return {
            weight: 3,
            color: getBuildStatColor(feature.properties.type),
            opacity: 1,
            bubblingMouseEvents: false
        };
    }

    pointToLayer (feature, latlng) {
        // console.log('POINT', latlng)
    }

    onEachFeature (feature, layer) {
        layer.on({
            click: function (e) {
                this.setState({ popup: { show: false } });
                this.showPopup(feature, e.latlng);
            }.bind(this)
        });
    }

    getTrails (refresh) {
        const gKey = this.state.filter.geoKey;
        if (refresh) {
            this.setState(init());
        }
        getUrbanTrails(cancelUT).then(
            res => {
                const transformData = urbanTrailTransform(res.data);
                const filters = getFilters(transformData);
                this.setState({ trails: transformData,
                    filter: {
                        show: this.state.filter.show,
                        geoKey: refresh ? gKey + 1 : this.state.filter.geoKey,
                        options: filters,
                        selected: this.state.filter.selected
                    },
                    hasError: false,
                    loading: false
                })
            },
            (e) => {
                if (e) {
                    if (axios.isCancel(e)) {
                        // Only cancelled on unmount so don't set state
                        console.log('Request was cancelled')
                    } else {
                        this.setState({ hasError: true, loading: false });
                    }
                }
            }
        );
    }

    componentDidMount () {
        this.getTrails();
    }

    componentWillUnmount () {
        cancelUT.cancel('Get Trails call cancelled');
    }

    showPopup (feature, latlng) {
        this.setState({ popup: { show: true, position: latlng, data: <TrailCard data={feature.properties.data} /> } });
    }

    // this is too noticeable
    handleMapResize = () => {
        let map = this.mapRef.current && this.mapRef.current.leafletElement ? this.mapRef.current.leafletElement : null;
        if (map) {
            map.invalidateSize(true);
        }
    };

    handleToggleFilter () {
        this.setState(toggleFilterShow(this.state));
        setTimeout(this.handleMapResize, 10);
    }

    refreshMap () {
        this.getTrails(true);
    }

    handleFilterChange (event) {
        if (event) {
            const target = event.target;
            const value = target.value;
            const showAll = value === 'Show All';
            let currentFilter = this.state.filter;
            let options = this.state.filter.options.map((item) => {
                if (item.value === value) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
                return item;
            });
            currentFilter.options = options;
            currentFilter.geoKey += 1;
            currentFilter.selected = value;

            let currentTrails = this.state.trails;

            let currentFeatures = currentTrails.featureColl.features.map(function (trailData) {
                if (showAll || (trailData.properties.data.urbanTrail3 === value)) {
                    trailData.properties.show = true;
                } else {
                    trailData.properties.show = false;
                }
                return trailData;
            });

            currentTrails.featureColl.features = currentFeatures;

            this.setState({ filter: currentFilter, trails: currentTrails })
        }
    }

    render () {
        let trailsMap = null;
        let filterPanel = null;

        if (!this.state.loading) {
            if (this.state.hasError || (this.state.trails && this.state.trails.featureColl && this.state.trails.featureColl.features.length === 0)) {
                const errorMessage = this.state.hasError ? this.messages.NETWORK_ERROR : this.messages.NO_DATA_FOUND;
                trailsMap = <div data-testid='error-message' style={{ margin: '0 auto', marginTop: 30 }}>{errorMessage}</div>;
            } else {
                const homeCoords = getHomeCoordinatesFromData(this.state.trails.featureColl);

                if (homeCoords && homeCoords.length === 2) {
                    const latlng = Leaflet.latLng([convertLatLng(homeCoords[1]), convertLatLng(homeCoords[0])]);
                    if (latlng) {
                        this.mapConfig.center = latlng;
                    }
                }
                const popup = this.state.popup.show ? (
                    <Popup position={this.state.popup.position}>{this.state.popup.data}</Popup>
                ) : null;

                if (this.state.filter.show) {
                    filterPanel =
                        <TrailFilterPanel filters={this.state.filter.options} changeHandler={this.handleFilterChange}
                            defaultValue={this.state.filter.selected} />
                } else {
                    filterPanel = null;
                }
                let showTrails = Object.assign({}, this.state.trails.featureColl);
                showTrails.features = this.state.trails.featureColl.features.reduce((acc, f) => {
                    if (f.properties.show) {
                        acc.push(f);
                    }
                    return acc;
                }, []);
                trailsMap = (
                    <Map ref={this.mapRef}
                        center={this.mapConfig.center}
                        zoom={this.mapConfig.zoom}
                        maxZoom={this.mapConfig.maxZoom}
                        className='map-reactleaflet'
                        data-testid='trail-map'
                    >
                        <TileLayer
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            attribution='Map data &copy; <a href=&quot;http://openstreetmap.org&quot;>OpenStreetMap</a>' />
                        <GeoJSON
                            key={this.state.filter.geoKey}
                            data={showTrails}
                            style={this.getStyle}
                            onEachFeature={this.onEachFeature}
                            pointToLayer={this.pointToLayer}
                        />
                        {popup}
                        <FilterControl position={'topleft'} onClick={this.handleToggleFilter}
                            selected={this.state.filter.selected} key={this.state.filter.geoKey + 1} />
                        <RefreshControl position='topright' onClick={() => this.refreshMap()} />
                        <LegendControl position={'bottomleft'} />
                    </Map>
                );
            }
        } else {
            trailsMap = <div style={{ margin: '0 auto', marginTop: 30 }}>{this.messages.LOADING_DATA}</div>;
        }

        return (
            <div className={'section-map'}>
                <div data-testid='map-section' className={'map'}>
                    {filterPanel}
                    {trailsMap}
                </div>
            </div>
        )
    }
}

export default UrbanTrails;
