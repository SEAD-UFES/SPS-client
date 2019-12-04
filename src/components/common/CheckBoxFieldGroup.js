import React from "react";
import PropTypes from "prop-types";

const CheckBoxFieldGroup = ({ id, name, text, value, checked, error, info, onChange }) => {
  return (
    <div className="form-group">
      <span className="form-control-label">{text}</span>
      <div>
        {info && <small>{info}</small>}
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
          <label className="form-check-label" htmlFor="id">
            {value}
          </label>
        </div>
        
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
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
