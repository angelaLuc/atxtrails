/* eslint-disable react/prop-types */
import React from "react";

const Dropdown = props => {
  return (
    <div className="dropdown form-inline" style={{ textAlign: "left", ...props.style }}>
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ maxWidth: 200, textOverflow: "ellipsis", overflow: "hidden" }}
        title={props.defaultValue}
      >
        {props.defaultValue}
      </button>
      <div className="dropdown-menu" style={{textAlign: "left"}} aria-labelledby="dropdownMenu2">
        {props.list.map(function(item) {
          return (
            <button
              className="dropdown-item"
              style={{width: 200, overflow: "hidden"}}
              type={"button"}
              key={item.id}
              onClick={() => props.changeHandler(item)}
              title={item.value}
            >
              {item.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
