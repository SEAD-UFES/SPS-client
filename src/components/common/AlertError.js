import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AlertError extends Component {
  render() {
    const errors = this.props.errors

    const show = errors.serverError || errors.anotherError ? true : false

    return show ? (
      <div>
        {this.props.errors.serverError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro:</strong>{' '}
            {this.props.errors.data.userMessage ? ` ${this.props.errors.data.userMessage}` : ' Erro do servidor.'}
          </div>
        ) : null}

        {this.props.errors.anotherError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro:</strong>
            {' Erro desconhecido.'}
          </div>
        ) : null}
      </div>
    ) : null
  }
}

AlertError.propTypes = {
  errors: PropTypes.object.isRequired
}

export default AlertError
