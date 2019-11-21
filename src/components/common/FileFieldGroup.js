import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FileFieldGroup = ({ name, label, error, info, onChange }) => {
  return (
    <div className="form-group">
      <label className="form-control-label">{label ? label : "Upload:"}</label>
      <div>
      {info && <small>{info}</small>}
        <input
          name={name}
          style={{ paddingBottom: "43px" }}
          className={classnames("form-control", {
            "is-invalid": error
          })}
          type="file"
          onChange={onChange}
        />
        
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

FileFieldGroup.propTypes = {
  name: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

FileFieldGroup.defaultProps = {
  type: "file"
};

export default FileFieldGroup;
