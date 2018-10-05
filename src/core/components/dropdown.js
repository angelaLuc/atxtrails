/* eslint-disable react/prop-types */
import React from 'react';

const Dropdown = props => {
    return (
        <div className='form-inline' style={{ textAlign: 'left', ...props.style }}>
            <select data-testid='dropdown-select' className={'form-control dropdown-custom'} onChange={props.changeHandler} value={props.defaultValue}>
                {props.list.map(function (item) {
                    return (
                        <option key={item.id} value={item.value}>
                            {item.value}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Dropdown;
