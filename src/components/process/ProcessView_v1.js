import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { getProcess } from "./processActions";
import Spinner from "../common/Spinner";
import CallTabList from "../call/CallTabList";
import DrawFilter from "../profile/DrawFilter";

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
      <div>
        <h4 className="mb-2">
          Informações do processo{" "}
          <small>
            <DrawFilter permission="processo seletivo editar" course_id={process.Course.id}>
              <Link className="text-info" to={`/processes/${process.id}/edit`}>
                <i className="fas fa-cog" />
              </Link>
            </DrawFilter>
          </small>
        </h4>
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
              <td>{process.visible ? "Processo visível" : "Processo oculto"}</td>
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
  }

  render() {
    const { process, loading } = this.props.processStore;

    const infoTable = process === null || loading ? <Spinner /> : this.renderInfoTable(process);

    const processActions =
      process === null || loading ? (
        <Spinner />
      ) : (
        <div className="btn-group mb-4" role="group">
          <DrawFilter permission="processo seletivo editar" course_id={process.Course.id}>
            <Link to={`/processes/${process.id}/edit`} className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Editar Processo
            </Link>
          </DrawFilter>

          <DrawFilter permission="chamada criar" course_id={process.Course.id}>
            <Link to={`/processes/${process.id}/calls/create`} className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Adicionar Chamada
            </Link>
          </DrawFilter>

          <DrawFilter permission="publication_create" course_id={process.Course.id}>
            <Link
              to={{
                pathname: `/processes/${process.id}/publications/create`,
                state: { selectiveProcess: process }
              }}
              className="btn btn-light"
            >
              <i className="fas fa-user-circle text-info mr-1" /> Adicionar Publicação
            </Link>
          </DrawFilter>
        </div>
      );

    const callsList =
      process === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Chamadas do processo</h4>
          {process.Calls.length > 0 ? (
            <CallTabList process_id={process.id} course_id={process.Course.id} calls={process.Calls} publications={process.Publications} />
          ) : (
            <p>
              Sem chamadas cadastradas.{" "}
              <DrawFilter permission="chamada criar" course_id={process.Course.id}>
                <Link className="text-success" to={`/processes/${process.id}/calls/create`}>
                  <i className="fas fa-plus-circle" />
                  Adicionar
                </Link>
              </DrawFilter>
            </p>
          )}
        </div>
      );

    const processPublications =
      process === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Publicações do processo</h4>
          {process.Publications.filter(value => {
            return value.call_id === null;
          }).length > 0 ? (
            <div>
              <p className="ml-4 mt-3">
                <DrawFilter permission="publication_create" course_id={process.Course.id}>
                  <Link
                    className="text-success mb-0"
                    to={{
                      pathname: `/processes/${process.id}/publications/create`,
                      state: { selectiveProcess: process }
                    }}
                  >
                    <i className="fas fa-plus-circle" /> Adicionar
                  </Link>
                </DrawFilter>
              </p>

              <ul className="timeline">
                {process.Publications.filter(value => {
                  return value.call_id === null;
                }).map(publication => {
                  return (
                    <li key={publication.id}>
                      <a
                        className={publication.valid ? "" : "isDisabled"}
                        onClick={publication.valid ? e => {} : e => e.preventDefault()}
                        href={publication.valid ? `http://localhost:3000/v1/publications/download/${publication.file}` : ""}
                      >
                        {moment(publication.date, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")} | {publication.PublicationType.name}
                      </a>{" "}
                      <DrawFilter permission="publication_update" course_id={process.Course.id}>
                        <Link
                          className="text-info"
                          to={{ pathname: `/processes/${process.id}/publications/${publication.id}/update`, state: { publication: publication } }}
                        >
                          <i className="fas fa-cog" />
                        </Link>
                      </DrawFilter>
                      {publication.description ? <p>{publication.description}</p> : ""}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p>
              Sem publicações de processo cadastrados.{" "}
              <DrawFilter permission="publication_create" course_id={process.Course.id}>
                <Link
                  className="text-success"
                  to={{
                    pathname: `/processes/${process.id}/publications/create`,
                    state: { selectiveProcess: process }
                  }}
                >
                  <i className="fas fa-plus-circle" />
                  Adicionar
                </Link>
              </DrawFilter>
            </p>
          )}
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