import MockAxios from 'axios-mock-adapter';
import * as axios from 'axios';
import 'jest-dom/extend-expect';
import { sampleTrailData } from '../../testdata/shared';
import * as api from '../../../src/api/trails';

describe('Test api', () => {
    let mock = null;

    beforeAll(() => {
        mock = new MockAxios(axios, { delayResponse: 50 });
        mock.onGet().replyOnce(200, sampleTrailData);
    });

    afterAll(() => mock.restore());

    test('trails', () => {
        jest.spyOn(api, 'getUrbanTrails').mockImplementation(() =>
            Promise.resolve({ data: sampleTrailData })
        );

        return api.getUrbanTrails().then(data => expect(data).toEqual({ data: sampleTrailData }));
    });
});
