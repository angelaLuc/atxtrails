import { getHomeCoordinatesFromData, urbanTrailTransform, getBuildStatColor, transformGEO } from '../../../src/trails/trail-utils';
import { sampleTrailData } from '../../testdata/shared';

describe('Trail Util tests', () => {
    test('getHomeCoordinatesFromData - with coords', () => {
        const testTrails = urbanTrailTransform(sampleTrailData);
        const coords = getHomeCoordinatesFromData(testTrails.featureColl);
        expect(coords[0]).toEqual(-97.76854342328298);
        expect(coords[1]).toEqual(30.2697962794447);
    });

    test('urbanTrailTransform', () => {
        const testTrails = urbanTrailTransform(sampleTrailData);
        expect(testTrails.featureColl.features.length).toEqual(5);
        expect(testTrails.buildStatTypes['EXISTING'].length).toEqual(1);
        expect(testTrails.buildStatTypes['PROPOSED'].length).toEqual(4);
        expect(testTrails.trailNames['VIOLET CROWN TRAIL'].length).toEqual(2);
    })

    test('getBuildStatColor', () => {
        expect(getBuildStatColor('EXISTING')).toEqual('black');
        expect(getBuildStatColor('FUNDED')).toEqual('green');
        expect(getBuildStatColor('PROPOSED')).toEqual('red');
        expect(getBuildStatColor('GOOBLE-GOOBLE')).toEqual('gray');
    });

    test('transformGEO', () => {
        const preTransform = sampleTrailData[3];
        const tGeo = transformGEO(preTransform);
        expect(tGeo.id).toEqual(preTransform.objectid);
    })
});
