/* eslint-disable react/prop-types */
import React from "react";

const Dropdown = props => {
  return (
    <div
      style={{ textAlign: "left", ...props.style }}
    >
      <input
        name="trails"
        data-testid="activity-time-record-category"
        className="form-control form-input-list"
        autoComplete={"off"}
        value={props.defaultValue}
        title={props.defaultValue}
        placeholder={"Type to Search..."}
        required
        onChange={event => props.changeHandler(event)}
        type={"search"}
        list={"trail-list"}
        style={{ width: 220, textOverflow: "ellipsis", overflow: "hidden", paddingLeft: 5, paddingRight: 5 }}
      />
      <datalist id="trail-list">
        {props.list.map(function(item, index) {
            return <option key={index} value={item.value} style={{ width: 220, overflow: "hidden" }} title={item.value}/>;
          })}
      </datalist>
    </div>
  );
};

export default Dropdown;
