import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import TextFieldGroup from "components/common/TextFieldGroup";
import SelectListGroup from "components/common/SelectListGroup";
import TextAreaFieldGroup from "components/common/TextAreaFieldGroup";

import { getProcess } from "components/process/processActions";
import { getProcessPublicationTypes } from "components/processPublicationTypes/processPublicationTypesActions";
import { getPublication, updatePublication } from "components/publication/publicationActions";

import { validateDateRequired, validateName } from "validation";
import { validatePublicationForm } from "./validatePublicationForm";

class PublicationUpdate extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      creation_date: "",
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

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
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

  onCheck(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };

    switch (e.target.name) {
      case "creation_date":
        valResult = validateDateRequired(e.target.value);
        break;
      case "selectiveProcess_id":
        valResult = validateName(e.target.value);
        break;
      case "publicationType_id":
        valResult = validateName(e.target.value);
        break;
      default:
        break;
    }

    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error };
    } else {
      delete errors[e.target.name];
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let publicationData = {
      id: this.state.id,
      date: this.state.creation_date,
      selectiveProcess_id: this.state.selectiveProcess_id,
      call_id: this.state.call_id ? this.state.call_id : null,
      step_id: this.state.step_id ? this.state.step_id : null,
      description: this.state.description ? this.state.description : null,
      publicationType_id: this.state.publicationType_id,
      file: this.state.file,
      valid: this.state.valid
    };

    const valRoleType = validatePublicationForm(publicationData, { verifyFile: false });
    if (!valRoleType.isValid) {
      this.setState({ errors: valRoleType.errors });
    } else {
      delete publicationData.file;
      this.props.updatePublication(publicationData, () => {
        this.props.history.push(`/processes/${this.state.selectiveProcess_id}`);
      });
    }
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

    const processPublicationTypeOptions = [{ label: "* Selecione o tipo de publicação", value: "" }].concat(
      processPublicationTypes
        ? processPublicationTypes.map(procPubTypes => {
            return {
              label: procPubTypes.name,
              value: procPubTypes.id
            };
          })
        : []
    );

    const processOptions = [{ label: "* Selecione o processo seletivo", value: "" }].concat(
      processes
        ? processes.map(process => {
            return {
              label: `${process.number}/${process.year} - ${process.Course.name}`,
              value: process.id
            };
          })
        : []
    );

    const callOptions = [{ label: "* Selecione a chamada", value: "" }].concat(
      calls
        ? calls.map(call => {
            return {
              label: `Chamada ${call.number}`,
              value: `${call.id}`
            };
          })
        : []
    );

    const stepOptions = [{ label: "* Selecione a etapa", value: "" }].concat(
      steps
        ? steps.map(step => {
            return {
              label: `Etapa ${step.number} | ${step.StepType.name}`,
              value: `${step.id}`
            };
          })
        : []
    );

    const publicationForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <TextFieldGroup
          type="date"
          name="creation_date"
          placeholder="* Data de criação"
          value={this.state.creation_date}
          onChange={this.onChange}
          error={errors.creation_date}
        />

        <SelectListGroup
          placeholder="* Selecione o processo seletivo"
          name="selectiveProcess_id"
          value={this.state.selectiveProcess_id}
          options={processOptions}
          onChange={this.onChange}
          error={errors.selectiveProcess_id}
          disabled={this.state.lock_process ? true : false}
        />

        {this.state.selectiveProcess_id ? (
          <SelectListGroup
            placeholder="* Selecione a chamada"
            name="call_id"
            value={this.state.call_id}
            options={callOptions}
            onChange={this.onChange}
            error={errors.call_id}
          />
        ) : (
          ""
        )}

        {this.state.call_id ? (
          <SelectListGroup
            placeholder="* Selecione a etapa"
            name="step_id"
            value={this.state.step_id}
            options={stepOptions}
            onChange={this.onChange}
            error={errors.step_id}
          />
        ) : (
          ""
        )}

        <TextAreaFieldGroup
          type="text"
          name="description"
          placeholder="Observações sobre a publicação"
          value={this.state.description}
          onChange={this.onChange}
          error={errors.description}
        />

        <SelectListGroup
          placeholder="* Selecione o tipo de publicação"
          name="publicationType_id"
          value={this.state.publicationType_id}
          options={processPublicationTypeOptions}
          onChange={this.onChange}
          error={errors.publicationType_id}
        />

        <div className="mt-4 mb-4">
          <a href={`http://localhost:3000/v1/publications/download/${this.state.fileName}`}>
            <i className="fas fa-file" /> {this.state.fileName}
          </a>
        </div>

        <div className="form-check mb-4">
          <input className="form-check-input" type="checkbox" name="valid" id="valid" checked={this.state.valid} onChange={this.onCheck} />
          <label className="form-check-label" htmlFor="valid">
            Documento atualizado
          </label>
        </div>

        <input type="submit" className="btn btn-info btn-block mt-4" />
      </form>
    );

    const deleteButton = (
      <div className="text-right mt-2 mb-2">
        <Link className="text-danger" to={{ pathname: `/processes/${this.state.selectiveProcess_id}/publications/${this.state.id}/delete` }}>
          <i className="fas fa-times-circle" /> Excluir esta publicação
        </Link>
      </div>
    );
    return (
      <div className="publication-update">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${process_id}`} className="btn btn-light">
                Voltar para processo seletivo
              </Link>
              <h1 className="display-4 text-center">Editar publicação</h1>
              <p className="lead text-center">Altere os dados básicos</p>
              {alertsList}
              {publicationForm}
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PublicationUpdate.proptypes = {
  getProcess: PropTypes.func.isRequired,
  getProcessPublicationTypes: PropTypes.func.isRequired,
  getPublication: PropTypes.func.isRequired,
  updatePublication: PropTypes.func.isRequired
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
    getProcess,
    getPublication,
    updatePublication
  }
)(PublicationUpdate);
