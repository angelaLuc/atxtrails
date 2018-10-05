import { sortByProperty, convertLatLng } from '../../../src/core/app-utils';

describe('App Util Function tests', () => {
    test('sortByProperty by id', () => {
        const testArray1 = [{ id: 6, value: 'Six' }, { id: 10, value: 'TEN' }, { id: 4, value: 'Four' }];
        expect(testArray1[0].id).toEqual(6);
        sortByProperty(testArray1, 'id');
        expect(testArray1[0].id).toEqual(4);
        expect(testArray1[1].id).toEqual(6);
        expect(testArray1[2].id).toEqual(10);
    });

    test('sortByProperty by value', () => {
        const testArray1 = [{ id: 6, value: 'Six' }, { id: 10, value: 'TEN' }, { id: 4, value: 'Four' }];
        expect(testArray1[0].id).toEqual(6);
        sortByProperty(testArray1, 'value');
        expect(testArray1[0].id).toEqual(4);
        expect(testArray1[1].id).toEqual(6);
        expect(testArray1[2].id).toEqual(10);
    });

    test('sortByProperty with duplicates', () => {
        const testArray1 = [{ id: 6, value: 'Six' }, { id: 10, value: 'TEN' }, { id: 4, value: 'Four' }, { id: 16, value: 'Six' }];
        expect(testArray1[0].id).toEqual(6);
        sortByProperty(testArray1, 'value');
        expect(testArray1[0].id).toEqual(4);
        expect(testArray1[1].id).toEqual(6);
        expect(testArray1[2].id).toEqual(16);
        expect(testArray1[3].id).toEqual(10);
    });

    test('convertLatLng', () => {
        expect(convertLatLng('0')).toEqual(0);
        expect(convertLatLng(null)).toEqual(NaN);
        expect(convertLatLng('test')).toEqual(NaN);
        expect(convertLatLng('NaN')).toEqual(NaN);
        expect(convertLatLng(NaN)).toEqual(0);
        expect(convertLatLng(Number.NaN)).toEqual(0);
        expect(convertLatLng(90)).toEqual(90);
        expect(convertLatLng('90')).toEqual(90);
    });
});
