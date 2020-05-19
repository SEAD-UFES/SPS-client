/** @format */

import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextFieldGroupOptional = props => {
  const { name, placeholder, value, error, label, info, type, onChange, disabled } = props

  return (
    <div className='form-group'>
      <label className='form-control-label'>{label ? label : placeholder}</label>
      {info && <small>{info}</small>}

      <div className='input-group'>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <input type='checkbox' aria-label='Checkbox for following text input' />
          </div>
        </div>

        <input
          type={type}
          className={classnames('form-control', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

TextFieldGroupOptional.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

TextFieldGroupOptional.defaultProps = {
  type: 'text'
}

export default TextFieldGroupOptional
