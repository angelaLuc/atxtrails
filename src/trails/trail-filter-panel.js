import React from "react";
import Dropdown from "../core/components/dropdown";
import PropTypes from "prop-types";

function TrailFilterPanel(props) {
  return (
    <div data-testid="trail-filter-panel" className={"filter-panel filter-list"}>
      <div className={"header"}>
        <h3>Filters</h3>
      </div>
      <div className={"list scroll-y"}>
        <label>
          By Trail Section<Dropdown
            list={props.filters}
            changeHandler={props.changeHandler}
            defaultValue={props.defaultValue}
          />
        </label>
      </div>
    </div>
  );
}

TrailFilterPanel.propTypes = {
  filters: PropTypes.array,
  changeHandler: PropTypes.func,
  defaultValue: PropTypes.string
};
export default TrailFilterPanel;
