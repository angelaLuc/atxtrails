import { init, toggleFilterShow } from '../../../src/trails/trail-state-functions';

describe('State Function tests', () => {
    test('Trails - init', () => {
        const postInitCall = init();

        expect(postInitCall.loading).toBeTruthy();
    });
    test('Trails - toggleFilterShow', () => {
        const postFilterToggle = toggleFilterShow({ filter: { show: false, options: [], geoKey: 1, selected: 'Show All' } });

        expect(postFilterToggle.filter.show).toBe(true);
        expect(postFilterToggle.filter.options.length).toEqual(0);
        expect(postFilterToggle.filter.selected).toEqual('Show All');
        expect(postFilterToggle.filter.geoKey).toEqual(1);

        let postToggle = toggleFilterShow(postFilterToggle);
        expect(postToggle.filter.show).toBe(false);
        expect(postToggle.filter.options.length).toEqual(0);
        expect(postToggle.filter.selected).toEqual('Show All');
        expect(postToggle.filter.geoKey).toEqual(1);
    });
});
