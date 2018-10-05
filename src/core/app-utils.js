export const sortByProperty = (array, prop) => {
    return array.sort(function (a, b) {
        var x = a[prop];
        var y = b[prop];
        if (typeof x === 'string') {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }
        return ((x < y) ? -1 : (x > y) ? 1 : 0);
    });
};

export const convertLatLng = num => {
    if (Number.isNaN(num)) {
        return 0;
    }
    return Number.parseFloat(num);
};
