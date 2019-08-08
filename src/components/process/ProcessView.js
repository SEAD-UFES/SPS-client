import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProcess } from "./processActions";
import Spinner from "../common/Spinner";
import DrawFilter from "../profile/DrawFilter";
import CallCard from "components/call/CallCard";
import PublicationCard from "components/publication/PublicationCard";

class ProcessView extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      if (this.props.authStore.isAuthenticated) {
        this.props.getProcess(this.props.match.params.id);
      } else {
        this.props.getProcess(this.props.match.params.id);
      }
    }
  }

  renderInfoTable(process) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Informações</h4>
            </div>
            <div className="col">
              <div className="float-right">
                <DrawFilter permission="processo seletivo editar" course_id={process.Course.id}>
                  <Link className="text-info" to={`/processes/${process.id}/edit`}>
                    <i className="fas fa-cog" /> Editar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-hover mt-0 mb-0">
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
              <DrawFilter permission="processo seletivo editar" course_id={process.Course.id}>
                <tr>
                  <td>
                    <strong>Visibilidade:</strong>
                  </td>
                  <td>{process.visible ? "Processo visível" : "Processo oculto"}</td>
                </tr>
              </DrawFilter>
              <tr>
                <td>
                  <strong>Descrição:</strong>
                </td>
                <td>{process.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderCalls(process) {
    return <CallCard process={process} course_id={process.id} />;
  }

  renderPublications(process) {
    return <PublicationCard process={process} course_id={process.id} />;
  }

  render() {
    const { process, loading } = this.props.processStore;

    const infoCard = process === null || loading ? <Spinner /> : this.renderInfoTable(process);
    const callCard = process === null || loading ? <Spinner /> : this.renderCalls(process);
    const pubCard = process === null || loading ? <Spinner /> : this.renderPublications(process);

    return (
      <div className="process-view">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/processes" className="btn btn-light">
                Voltar para lista de processos
              </Link>
              <h1 className="display-4">Processo seletivo</h1>
              {infoCard}
              {callCard}
              {pubCard}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProcessView.propTypes = {
  getProcess: PropTypes.func.isRequired,
  processStore: PropTypes.object.isRequired,
  authStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  processStore: state.processStore,
  authStore: state.authStore
});

export default connect(
  mapStateToProps,
  {
    getProcess
  }
)(ProcessView);
