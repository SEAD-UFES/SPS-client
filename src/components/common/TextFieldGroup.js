import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({ name, placeholder, value, error, label, info, type, onChange, disabled }) => {
  return (
    <div className="form-group">
      <label className="form-control-label">{label ? label : placeholder}</label>
      <div>
        {info && <small>{info}</small>}
        <input
          type={type}
          className={classnames("form-control", {
            "is-invalid": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {error && <div className="invalid-feedback">{error}</div>}
     </div>
   </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
