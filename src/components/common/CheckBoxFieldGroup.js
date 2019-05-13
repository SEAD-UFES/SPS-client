import React from "react";
import PropTypes from "prop-types";

const CheckBoxFieldGroup = ({ id, name, value, checked, error, info, onChange }) => {
  return (
    <div className="form-group">
      <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
        <label className="form-check-label" htmlFor={id}>
          {value}
        </label>
      </div>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxFieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default CheckBoxFieldGroup;
