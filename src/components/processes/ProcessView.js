import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProcess } from "../../actions/processActions";
import Spinner from "../common/Spinner";

class ProcessView extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProcess(this.props.match.params.id);
    }
  }

  render() {
    const { process, loading } = this.props.process;

    let processContent;
    if (process === null || loading) {
      processContent = <Spinner />;
    } else {
      processContent = (
        <div>
          {/* <!-- Process basic data --> */}
          <p className="lead text-muted">
            {`${process.number}/${process.year}`}
          </p>

          {/* <!-- Dashboard Actions --> */}
          <div className="btn-group mb-4" role="group">
            <Link
              to={`/processes/${process.id}/edit`}
              className="btn btn-light"
            >
              <i className="fas fa-user-circle text-info mr-1" /> Editar
              Processo
            </Link>
            <Link
              to={`/processes/${process.id}/add-call`}
              className="btn btn-light"
            >
              <i className="fas fa-user-circle text-info mr-1" /> Adicionar
              Chamada
            </Link>
            <Link
              to={`/processes/${process.id}/add-publication`}
              className="btn btn-light"
            >
              <i className="fas fa-user-circle text-info mr-1" /> Adicionar
              Publicação
            </Link>
          </div>

          {/* <!-- Dados de usuário --> */}
          <div>
            <h4 className="mb-2">Dados do processo</h4>

            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Número/Ano:</strong>
                </p>
              </div>
              <div className="col-md-10">
                <p>
                  {process.number}/{process.year}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Visibilidade:</strong>
                </p>
              </div>
              <div className="col-md-10">
                <p>
                  {process.visible ? "Processo visível" : "Processo oculto"}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Descrição:</strong>
                </p>
              </div>
              <div className="col-md-10">
                <p>{process.description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/processes" className="btn btn-light">
                Voltar para lista de processos
              </Link>
              <h1 className="display-4">Processo seletivo</h1>
              {processContent}
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
