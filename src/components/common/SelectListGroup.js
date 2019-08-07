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
    <div className="form-group row">
      <label className="col-lg-2 col-form-label form-control-label font-weight-bold">{label ? label : "Selecione:"}</label>
      <div className="col-lg-10">
        <select
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {selectOptions}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
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
