import MockAxios from 'axios-mock-adapter';
import * as axios from 'axios';
import { cleanup, render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import React from 'react';
import UrbanTrails from '../../../src/trails/urban-trails';
import { sampleTrailData } from '../../testdata/shared';

/*
Majority of map tests are in cypress
 */
describe('Test <UrbanTrails /> component (no data)', () => {
    let mock = null;

    beforeAll(() => {
        mock = new MockAxios(axios, { delayResponse: 50 });
        mock.onGet().replyOnce(200, []);
    });

    afterAll(() => mock.restore());
    afterEach(cleanup);

    test('Default test', () => {
        const trailSpy = jest.spyOn(UrbanTrails.prototype, 'componentDidMount');
        const { getByTestId } = render(<UrbanTrails />, {
            context: {},
            disableLifecycleMethods: false
        });

        expect(getByTestId('map-section')).toBeTruthy();
        expect(getByTestId('map-section')).toHaveTextContent('Loading');
        expect(trailSpy).toHaveBeenCalled();
    });
});

describe('Test <UrbanTrails /> component (no data)', () => {
    let mock = null;

    beforeAll(() => {
        mock = new MockAxios(axios, { delayResponse: 50 });
        mock.onGet().replyOnce(200, sampleTrailData);
    });

    afterAll(() => mock.restore());
    afterEach(cleanup);

    test('Default test', () => {
        const trailSpy = jest.spyOn(UrbanTrails.prototype, 'componentDidMount');
        // const getTrailsSpy = jest.spyOn(api, 'getUrbanTrails').mockImplementation(() =>
        //     Promise.resolve({ data: sampleTrailData })
        // );
        const { getByTestId } = render(<UrbanTrails />, {
            context: {},
            disableLifecycleMethods: false
        });

        expect(getByTestId('map-section')).toBeTruthy();
        expect(getByTestId('map-section')).toHaveTextContent('Loading');
        expect(trailSpy).toHaveBeenCalled();
    });
});
