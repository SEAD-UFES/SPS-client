import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "components/common/Spinner";

import { getCall, deleteCall } from "components/call/callActions";

class CallDelete extends Component {
  constructor() {
    super();
    this.state = { errors: [] };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.call_id) {
      this.props.getCall(this.props.match.params.call_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    //error handling
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.deleteCall(this.props.match.params.call_id, () => {
      this.props.history.push(`/processes/${this.props.match.params.process_id}`);
    });
  }

  render() {
    const { call, loading } = this.props;
    const { errors } = this.state;

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ""
        )}
        {errors.anotherError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro desconhecido
          </div>
        ) : (
          ""
        )}
      </div>
    );

    const infoTable =
      call === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Informações</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{call.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Número:</strong>
                </td>
                <td>{call.number}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    const choices = (
      <div className="row">
        <div className="col">
          <input type="button" value="Excluir" className="btn btn-danger btn-block mt-4" onClick={this.onSubmit} />
        </div>
        <div className="col">
          <input
            type="button"
            value="Cancelar"
            className="btn btn-secondary btn-block mt-4"
            onClick={() => {
              this.props.history.goBack();
            }}
          />
        </div>
      </div>
    );

    return (
      <div className="roleassignments">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4 mb-4 text-center">Excluir chamada</h1>
              {alertsList}
              <p className="lead text-center">Você solicitou excluir o item:</p>
              {infoTable}
              <p className="lead text-center">Confirma a operação?</p>
              {choices}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CallDelete.propTypes = {
  getCall: PropTypes.func.isRequired,
  deleteCall: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  call: state.callStore.call,
  loading: state.callStore.loading,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getCall,
    deleteCall
  }
)(CallDelete);