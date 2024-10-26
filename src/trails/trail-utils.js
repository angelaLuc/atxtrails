import centerMean from "@turf/center-mean";
import { sortByProperty } from "../core/app-utils";

export function transformGEO(origGeoData) {
  const modifiedGeoData = {
    buildStat: origGeoData?.build_status,
    id: origGeoData?.objectid,
    lengthMile: origGeoData?.length_miles,
    location: `${origGeoData?.city_municipal}` || "Unknown",
    trailSurface: origGeoData?.trail_surface_type,
    priority: origGeoData?.priority || "Unknown",
    managedBy: origGeoData?.managing_agency_name,
    shapeLength: origGeoData?.shape_length,
    geometry: origGeoData?.the_geom,
    urbanTrail1: origGeoData?.urban_trail_network_id,
    urbanTrail2: origGeoData?.urban_trail_name,
    urbanTrail3: origGeoData?.urban_trail_system_name,
    urbanTrail4: origGeoData?.urban_trail_type,
    urbanTrail: origGeoData?.urban_trail_feature,
    trailWidthFeet: origGeoData?.width
  };
  const testForValidLatLonArray = modifiedGeoData?.geometry.coordinates[0];
  //console.log('STAT', modifiedGeoData.buildStat);
  if(testForValidLatLonArray?.length) {
    const surveySays = testForValidLatLonArray.filter((latlon) => testForValidLatLon(latlon[0], latlon[1])).length > 0
    if(!surveySays) {
      return null;
    }
  }
  return modifiedGeoData;
}

const BUILD_STATUS_OPTIONS = {
  EXISTING: "black",
  FUNDED: "blue",
  PROPOSED: "red",
  DEFAULT: "gray"
}

export function getBuildStatColor(type = "UNKNOWN") {

  const buildType = type ? type.toUpperCase() : type;
  let colorStat = null;
  switch (buildType) {
    case "EXISTING":
      colorStat = BUILD_STATUS_OPTIONS.EXISTING; break;
    case "FUNDED":
    case "CONSTRUCTION":
      colorStat = BUILD_STATUS_OPTIONS.FUNDED; break;
    case "PROPOSED":
    case "DESIGN":
      colorStat = BUILD_STATUS_OPTIONS.PROPOSED; break;
    default:
      colorStat = BUILD_STATUS_OPTIONS.DEFAULT;
  }
  if (colorStat === BUILD_STATUS_OPTIONS.DEFAULT) {
    if(buildType.startsWith("FUNDED")) {
      colorStat = BUILD_STATUS_OPTIONS.FUNDED
    }
    if(buildType.startsWith("PROPOSED") || buildType.startsWith("PRELIMINARY")) {
      colorStat = BUILD_STATUS_OPTIONS.PROPOSED;
    }
  }
  return colorStat;
}

export function getFilters(data) {
  let filterIndex = 1;
  let filteroptions = Object.keys(data.trailNames).reduce((acc, value) => {
    acc.push({
      id: (filterIndex += 1),
      value: value,
      selected: false,
      key: "selectedFilter"
    });
    return acc;
  }, []);

  let sortedFilterOptions = sortByProperty(filteroptions, "value");
  sortedFilterOptions.unshift({
    id: 0,
    value: "Show All",
    selected: true,
    key: "selectedFilter"
  });
  return sortedFilterOptions;
}

export function testForValidLatLon(x,y) {
  //console.log(`xxxxx${x} yyyyy${y} result${-90 <= y && y <= +90 && -180 <= x && x <= 180}`)
  //console.log('result', -90 <= y && y <= +90 && -180 <= x && x <= 180);
  return -90 <= y && y <= +90 && -180 <= x && x <= 180;
}

export function urbanTrailTransform(geojson) {
  let results = geojson.reduce(
    (acc, geo) => {
      const transGEO = transformGEO(geo);
      //console.log('transgeo', transGEO)
      if (transGEO) {
        if (acc.buildStatTypes[transGEO.buildStat]) {
          acc.buildStatTypes[transGEO.buildStat].push(transGEO.id);
        } else {
          acc.buildStatTypes[transGEO.buildStat] = [transGEO.id];
        }

        if (acc.trailNames[transGEO.urbanTrail3]) {
          acc.trailNames[transGEO.urbanTrail3].push(transGEO.id);
        } else {
          acc.trailNames[transGEO.urbanTrail3] = [transGEO.id];
        }

        acc.featureColl.features.push({
          type: "Feature",
          geometry: transGEO.geometry,
          properties: {type: transGEO.buildStat, data: transGEO, show: true}
        });
      }
      return acc;
    },
    {
      buildStatTypes: {},
      trailNames: {},
      featureColl: { type: "FeatureCollection", features: [] }
    }
  );

  return results;
}

export const getHomeCoordinatesFromData = data => {
  let home = null;
  if (data) {
    let selectedFeatures = data.features.reduce((acc, f) => {
      if (f.properties.show) {
        acc.push(f);
      }
      return acc;
    }, []);
    let mean = centerMean(
      { type: "FeatureCollection", features: selectedFeatures },
      {}
    );
    home =
      mean && mean.geometry && mean.geometry.coordinates
        ? mean.geometry.coordinates
        : null;
  }

  return home;
};
