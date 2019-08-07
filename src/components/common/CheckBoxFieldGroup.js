import React from "react";
import PropTypes from "prop-types";

const CheckBoxFieldGroup = ({ id, name, text, value, checked, error, info, onChange }) => {
  return (
    <div className="row">
      <span className="col-lg-2 col-form-label form-control-label font-weight-bold">{text}</span>
      <div className="col-lg-10 align-self-center">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
          <label className="form-check-label" htmlFor="id">
            {value}
          </label>
        </div>
        {info && <small className="form-text text-muted">{info}</small>}
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
