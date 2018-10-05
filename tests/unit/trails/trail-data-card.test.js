import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { sampleTrailData } from '../../testdata/shared';
import { urbanTrailTransform } from '../../../src/trails/trail-utils';
import TrailCard from '../../../src/trails/trail-data-card';

describe('Test <TrailCard /> component', () => {
    afterEach(cleanup);

    test('Default test', () => {
        const testTrails = urbanTrailTransform(sampleTrailData);
        const { getByTestId } = render(<TrailCard data={testTrails.featureColl.features[0].properties.data} />, {
            context: {},
            disableLifecycleMethods: true
        });
        expect(getByTestId('trail-card')).toHaveTextContent('DENSON DR TO ALEXANDER AVE');
    });
});
