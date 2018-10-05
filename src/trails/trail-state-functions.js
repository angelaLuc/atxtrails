export function init () {
    return {
        filter: { show: false, options: [], geoKey: 1, selected: 'Show All' },
        loading: true,
        hasError: false,
        trails: {},
        popup: { show: false, latlng: [0, 0], data: {} }
    }
}

export function toggleFilterShow (state) {
    return ({
        filter: {
            show: !state.filter.show,
            options: state.filter.options,
            geoKey: state.filter.geoKey,
            selected: state.filter.selected
        }
    });
}
