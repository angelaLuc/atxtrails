import React from "react";
import PropTypes from "prop-types";

function TrailCard(props) {
  const {
    id,
    location,
    lengthMile,
    buildStat,
    trailSurface,
    trailWidthFeet,
    urbanTrail,
    urbanTrail1,
    urbanTrail2,
    urbanTrail3,
    urbanTrail4
  } = props.data;
  return (
    <div data-testid="trail-card" className="card trail-card">
      <h5 className="card-header2">ID - {id}</h5>
      <div className="card-body">
        <span>
          Status (in 2018): {buildStat} <br />
        </span>
        <span>
          Location: {location}
          <br />
        </span>
        <span className={"card-text"}>
          Length: {lengthMile} miles<br />
        </span>
        <span>
          Surface type: {trailSurface} <br />
        </span>
        <span>
          Trail Width: {trailWidthFeet} feet <br />
        </span>
        <ul className="list-group list-group-flush list-unstyled">
          <li>{urbanTrail}</li>
          <li>{urbanTrail1}</li>
          <li>{urbanTrail2}</li>
          <li>{urbanTrail3}</li>
          <li>{urbanTrail4}</li>
        </ul>
      </div>
    </div>
  );
}

TrailCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    location: PropTypes.string,
    lengthMile: PropTypes.string,
    buildStat: PropTypes.string,
    trailSurface: PropTypes.string,
    trailWidthFeet: PropTypes.string,
    urbanTrail: PropTypes.string,
    urbanTrail1: PropTypes.string,
    urbanTrail2: PropTypes.string,
    urbanTrail3: PropTypes.string,
    urbanTrail4: PropTypes.string
  })
};
export default TrailCard;
