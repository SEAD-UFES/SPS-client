import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, label, value, error, info, onChange, options, disabled }) => {
  const selectOptions = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <label className="form-control-label">{label ? label : "Selecione"}</label>
      <div>
        {info && <small>{info}</small>}
        <select
          className={classnames("form-control", {
            "is-invalid": error
          })}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {selectOptions}
        </select>
        
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
