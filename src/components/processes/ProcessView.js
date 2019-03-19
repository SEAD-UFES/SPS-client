import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProcess } from "../../actions/processActions";
import Spinner from "../common/Spinner";
import CallTabList from "../processCalls/CallTabList";

class ProcessView extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProcess(this.props.match.params.id);
    }
  }

  render() {
    const { process, loading } = this.props.process;

    const infoTable =
      process === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Informações do processo</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Número/Ano:</strong>
                </td>
                <td>
                  {process.number}/{process.year}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Curso:</strong>
                </td>
                <td>{process.Course.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Visibilidade:</strong>
                </td>
                <td>
                  {process.visible ? "Processo visível" : "Processo oculto"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Descrição:</strong>
                </td>
                <td>{process.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    const processActions =
      process === null || loading ? (
        <Spinner />
      ) : (
        <div className="btn-group mb-4" role="group">
          <Link to={`/processes/${process.id}/edit`} className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" /> Editar Processo
          </Link>
          <Link
            to={`/processes/${process.id}/calls/create`}
            className="btn btn-light"
          >
            <i className="fas fa-user-circle text-info mr-1" /> Adicionar
            Chamada
          </Link>
          <Link
            to={{
              pathname: `/processes/${process.id}/publications/create`,
              state: { selectiveProcess: process }
            }}
            className="btn btn-light"
          >
            <i className="fas fa-user-circle text-info mr-1" /> Adicionar
            Publicação
          </Link>
        </div>
      );

    const basicData =
      process === null || loading ? (
        <Spinner />
      ) : (
        <p className="lead text-muted">
          {`${process.number}/${process.year} - ${process.Course.name}`}
        </p>
      );

    const callsList =
      process === null || loading ? (
        <Spinner />
      ) : (
        <CallTabList calls={process.Calls} />
      );

    const processPublications = (
      <div>
        <h4 className="mb-2">Publicações do edital</h4>
      </div>
    );

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/processes" className="btn btn-light">
                Voltar para lista de processos
              </Link>
              <h1 className="display-4">Processo seletivo</h1>
              {basicData}
              {processActions}
              {infoTable}
              {processPublications}
              {callsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProcessView.propTypes = {
  getProcess: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  process: state.process
});

export default connect(
  mapStateToProps,
  {
    getProcess
  }
)(ProcessView);
