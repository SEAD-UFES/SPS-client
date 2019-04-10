import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { getProcess } from "actions/processActions";
import { createPublication } from "./publicationActions";
import { getProcessPublicationTypes } from "components/processPublicationTypes/processPublicationTypesActions";
import { getPublication, deletePublication } from "components/publication/publicationActions";

class PublicationDelete extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      creation_date: "",
      name: "",
      selectiveProcess_id: "",
      call_id: "",
      step_id: "",
      publicationType_id: "",
      description: "",
      valid: true,

      fileName: "",

      file: null,
      fileUrl: null,

      selectiveProcess: "",
      lock_process: false,
      lock_call: false,

      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    //handling process on state
    if (this.props.location.state && this.props.location.state.selectiveProcess) {
      this.setState({
        selectiveProcess_id: this.props.location.state.selectiveProcess.id,
        selectiveProcess: this.props.location.state.selectiveProcess,
        lock_process: true
      });
    } else {
      if (this.props.match.params.process_id) {
        this.setState({
          selectiveProcess_id: this.props.match.params.process_id,
          lock_process: true
        });
        this.props.getProcess(this.props.match.params.process_id);
      }
      if (this.props.match.params.call_id) {
        this.setState({
          call_id: this.props.match.params.call_id,
          lock_call: true
        });
      }
    }

    //handling publication on state. Else load
    if (this.props.location.state && this.props.location.state.publication) {
      this.setState({
        id: this.props.location.state.publication.id,
        creation_date: moment(this.props.location.state.publication.date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD"),
        selectiveProcess_id: this.props.location.state.publication.selectiveProcess_id,
        call_id: this.props.location.state.publication.call_id ? this.props.location.state.publication.call_id : "",
        step_id: this.props.location.state.publication.step_id ? this.props.location.state.publication.step_id : "",
        publicationType_id: this.props.location.state.publication.publicationType_id ? this.props.location.state.publication.publicationType_id : "",
        description: this.props.location.state.publication.description ? this.props.location.state.publication.description : "",
        valid: this.props.location.state.publication.valid,
        fileName: this.props.location.state.publication.file
      });
    } else {
      if (this.props.match.params.publication_id) {
        this.props.getPublication(this.props.match.params.publication_id);
      }
    }
  }

  componentDidMount() {
    this.props.getProcessPublicationTypes();
  }

  componentWillReceiveProps(nextProps) {
    //Errors
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }

    //Load process on State if dont have
    if (!this.state.selectiveProcess) {
      if (nextProps.process) {
        const process = nextProps.process.process;
        const loading = nextProps.process.loading;

        if (process !== null && loading === false) {
          this.setState({
            selectiveProcess_id: process.id,
            selectiveProcess: process
          });
        }
      }
    }

    //load publication on state if needed.
    if (!(this.props.location.state && this.props.location.state.publication)) {
      if (nextProps.processPublicationsStore) {
        const publication = nextProps.processPublicationsStore.processPublication;
        const loading = nextProps.processPublicationsStore.loading;
        if (publication !== null && loading === false) {
          this.setState({
            id: publication.id,
            creation_date: moment(publication.date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD"),
            selectiveProcess_id: publication.selectiveProcess_id,
            call_id: publication.call_id ? publication.call_id : "",
            step_id: publication.step_id ? publication.step_id : "",
            publicationType_id: publication.publicationType_id ? publication.publicationType_id : "",
            description: publication.description ? publication.description : "",
            valid: publication.valid,
            fileName: publication.file
          });
        }
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.deletePublication(this.state.id, () => {
      this.props.history.push(`/processes/${this.state.selectiveProcess_id}`);
    });
  }

  render() {
    //load raw data
    const { errors, selectiveProcess } = this.state;
    const process_id = this.props.match.params.process_id;
    const { processPublicationTypesStore } = this.props;

    //mounting data structures
    const processPublicationTypes =
      processPublicationTypesStore.processPublicationTypes !== null && !processPublicationTypesStore.loading
        ? processPublicationTypesStore.processPublicationTypes
        : [];

    const processes = selectiveProcess ? [selectiveProcess] : [];

    const calls = selectiveProcess ? selectiveProcess.Calls : [];

    const steps =
      selectiveProcess && this.state.call_id
        ? selectiveProcess.Calls.filter(item => {
            return item.id === this.state.call_id;
          })[0].Steps
        : [];

    const chosenProcess = processes.filter(value => {
      return value.id === this.state.selectiveProcess_id;
    });

    const chosenCall = calls.filter(value => {
      return value.id === this.state.call_id;
    });

    const chosenStep = steps.filter(value => {
      return value.id === this.state.step_id;
    });

    const chosenType = processPublicationTypes.filter(value => {
      return value.id === this.state.publicationType_id;
    });

    //mounting render pieces
    const alertsList = (
      <div>
        {errors.serverError ? (
          <div class="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ""
        )}
        {errors.anotherError ? (
          <div class="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro desconhecido
          </div>
        ) : (
          ""
        )}
      </div>
    );

    const infoTable = (
      <div>
        <h4 className="mb-2">Informações</h4>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <strong>Id:</strong>
              </td>
              <td>{this.state.id}</td>
            </tr>

            <tr>
              <td>
                <strong>Data:</strong>
              </td>
              <td>{moment(this.state.creation_date).format("DD/MM/YYYY")}</td>
            </tr>

            <tr>
              <td>
                <strong>Curso:</strong>
              </td>
              <td>{chosenProcess.length > 0 ? `${chosenProcess[0].number}/${chosenProcess[0].year} - ${chosenProcess[0].Course.name}` : ""}</td>
            </tr>

            {this.state.call_id ? (
              <tr>
                <td>
                  <strong>Chamada:</strong>
                </td>
                <td>{chosenCall.length > 0 ? `Chamada ${chosenCall[0].number}` : ""}</td>
              </tr>
            ) : null}

            {this.state.step_id ? (
              <tr>
                <td>
                  <strong>Etapa:</strong>
                </td>
                <td>{chosenStep.length > 0 ? `Etapa ${chosenStep[0].number}` : ""}</td>
              </tr>
            ) : null}

            <tr>
              <td>
                <strong>Descrição:</strong>
              </td>
              <td>{this.state.description ? this.state.description : ""}</td>
            </tr>

            <tr>
              <td>
                <strong>Tipo:</strong>
              </td>
              <td>{chosenType.length > 0 ? chosenType[0].name : ""}</td>
            </tr>

            <tr>
              <td>
                <strong>Atualizado:</strong>
              </td>
              <td>{this.state.valid ? "Sim" : "Não"}</td>
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
      <div className="publication-delete">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${process_id}`} className="btn btn-light">
                Voltar para processo seletivo
              </Link>
              <h1 className="display-4 text-center">Excluir publicação</h1>
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

PublicationDelete.proptypes = {
  getProcess: PropTypes.func.isRequired,
  getProcessPublicationTypes: PropTypes.func.isRequired,
  createPublication: PropTypes.func.isRequired,
  getPublication: PropTypes.func.isRequired,
  deletePublication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  process: state.process,
  processPublicationTypesStore: state.processPublicationTypesStore,
  processPublicationsStore: state.processPublicationsStore
});

export default connect(
  mapStateToProps,
  {
    getProcessPublicationTypes,
    createPublication,
    getProcess,
    getPublication,
    deletePublication
  }
)(PublicationDelete);
