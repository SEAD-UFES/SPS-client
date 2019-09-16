import React from 'react'
//import classnames from 'classnames'
import PropTypes from 'prop-types'
import CKEditor4 from 'ckeditor4-react'
//import CKEDITOR from 'ckeditor'

const TextAreaField_CKEditor4 = ({ name, label, placeholder, value, error, info, onChange }) => {
  return (
    <div className="form-group row">
      <label className="col-lg-2 col-form-label form-control-label font-weight-bold">{label ? label : 'Texto:'}</label>
      <div className="col-lg-10">
        {/* <textarea
          className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        /> */}

        {console.log(window.CKEDITOR)}
        <CKEditor4
          data={value}
          type="classic"
          config={{
            toolbarGroups: [
              { name: 'styles' },
              { name: 'forms' },
              { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
              { name: 'links' },
              { name: 'document', groups: ['mode', 'document', 'doctools'] }
            ],
            allowedContent: {
              $1: {
                // Use the ability to specify elements as an object.
                elements: window.CKEDITOR ? window.CKEDITOR.dtd : null,
                attributes: true,
                styles: true,
                classes: true
              }
            },
            disallowedContent: 'script; *[on*]'
          }}
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
          onChange={onChange}
        />

        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextAreaField_CKEditor4.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaField_CKEditor4
