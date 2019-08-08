import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FileFieldGroup = ({ name, label, error, info, onChange }) => {
  // return (
  //   <div className="form-group">
  //     <input
  //       name={name}
  //       style={{ paddingBottom: "43px" }}
  //       className={classnames("form-control form-control-lg", {
  //         "is-invalid": error
  //       })}
  //       type="file"
  //       onChange={onChange}
  //     />
  //     {info && <small className="form-text text-muted">{info}</small>}
  //     {error && <div className="invalid-feedback">{error}</div>}
  //   </div>
  // );

  return (
    <div className="form-group row">
      <label className="col-lg-2 col-form-label form-control-label font-weight-bold">{label ? label : "Upload:"}</label>
      <div className="col-lg-10">
        <input
          name={name}
          style={{ paddingBottom: "43px" }}
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          type="file"
          onChange={onChange}
        />
        {info && <small className="form-text text-muted">{info}</small>}
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
