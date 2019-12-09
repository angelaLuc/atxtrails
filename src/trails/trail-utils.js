import centerMean from "@turf/center-mean";
import { sortByProperty } from "../core/app-utils";

export function transformGEO(origGeoData) {
  const modifiedGeoData = {
    buildStat: origGeoData.build_stat,
    id: origGeoData.objectid,
    lengthMile: origGeoData.length_mil,
    location: origGeoData.location,
    trailSurface: origGeoData.trail_surf,
    priority: origGeoData.priority,
    managedBy: origGeoData.managing_a,
    shapeLength: origGeoData.shape_len,
    geometry: origGeoData.the_geom,
    urbanTrail1: origGeoData.urban_tr_1,
    urbanTrail2: origGeoData.urban_tr_2,
    urbanTrail3: origGeoData.urban_tr_3,
    urbanTrail4: origGeoData.urban_tr_4,
    urbanTrail: origGeoData.urban_trail,
    trailWidthFeet: origGeoData.width
  };
  return modifiedGeoData;
}

export function getBuildStatColor(type) {
  switch (type) {
    case "EXISTING":
      return "black";
    case "FUNDED":
      return "green";
    case "PROPOSED":
      return "red";
    default:
      return "gray";
  }
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

export function urbanTrailTransform(geojson) {
  let results = geojson.reduce(
    (acc, geo) => {
      const transGEO = transformGEO(geo);
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
        properties: { type: transGEO.buildStat, data: transGEO, show: true }
      });

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
