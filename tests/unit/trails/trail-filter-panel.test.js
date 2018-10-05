import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { sampleTrailData } from '../../testdata/shared';
import { urbanTrailTransform, getFilters } from '../../../src/trails/trail-utils';
import TrailFilterPanel from '../../../src/trails/trail-filter-panel';

let stubChangeHandler = function (e) {

};

describe('Test <TrailFilterPanel /> component', () => {
    afterEach(cleanup);

    test('Default test', () => {
        const testTrails = urbanTrailTransform(sampleTrailData);
        const filters = getFilters(testTrails);
        const { getByTestId } = render(<TrailFilterPanel filters={filters} changeHandler={stubChangeHandler} defaultValue={'Show All'} />, {
            context: {},
            disableLifecycleMethods: true
        });
        expect(getByTestId('trail-filter-panel')).toHaveTextContent('VIOLET CROWN TRAIL');
    });
});
