import React, { Component } from "react";
import PropTypes from "prop-types";

class AlertError extends Component {
  render() {
    const errors = this.props.errors;

    const show = errors.serverError || errors.anotherError ? true : false;

    return show ? (
      <div>
        {
          (serverError = this.props.errors.serverError ? (
            <div class="alert alert-danger" role="alert">
              <strong>Erro!</strong> Erro do servidor
            </div>
          ) : null)
        }

        {
          (anotherError = this.props.errors.anotherError ? (
            <div class="alert alert-danger" role="alert">
              <strong>Erro!</strong> Erro desconhecido
            </div>
          ) : null)
        }
      </div>
    ) : null;
  }
}

AlertError.propTypes = {
  errors: PropTypes.object.isRequired
};

export default AlertError;
