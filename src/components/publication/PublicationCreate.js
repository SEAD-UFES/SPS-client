import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import TextFieldGroup from "components/common/TextFieldGroup";
import SelectListGroup from "components/common/SelectListGroup";
import TextAreaFieldGroup from "components/common/TextAreaFieldGroup";
import FileFieldGroup from "../common/FileFieldGroup";
import CheckBoxFieldGroup from "components/common/CheckBoxFieldGroup";

import { getProcess } from "components/process/processActions";
import { createPublication } from "./publicationActions";
import { getPublicationTypes } from "components/publicationType/publicationTypeActions";

import { validateDateRequired, validateName } from "validation";
import { validatePublicationForm } from "./validatePublicationForm";
import { validateFileType } from "../../validation";

class PublicationCreate extends Component {
  constructor() {
    super();

    this.state = {
      creation_date: moment().format("YYYY-MM-DD"),
      name: "",
      selectiveProcess_id: "",
      call_id: "",
      step_id: "",
      publicationType_id: "",
      description: "",
      valid: true,

      file: null,
      fileUrl: null,

      selectiveProcess: null,
      lock_process: false,
      lock_call: false,

      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    //get process from link
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
  }

  componentDidMount() {
    this.props.getPublicationTypes();
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
        let process = nextProps.process.process;
        let loading = nextProps.process.loading;

        if (process !== null && loading === false) {
          this.setState({
            selectiveProcess_id: process.id,
            selectiveProcess: process
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

  onChangeFile(e) {
    e.preventDefault();

    let file = e.target.files[0];
    let reader = new FileReader();
    const fieldName = e.target.name;
    let errors = this.state.errors;

    reader.onloadend = e => {
      //validation
      let valResult = validateFileType(file, ["application/pdf"]);
      if (!valResult.isValid) {
        errors = { ...errors, [fieldName]: valResult.error };
      } else {
        delete errors[fieldName];
      }

      //setting values on state
      this.setState({
        file: file,
        fileUrl: reader.result,
        errors: errors
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      //validation
      let valResult = validateFileType(file, ["application/pdf"]);
      if (!valResult.isValid) {
        errors = { ...errors, [fieldName]: valResult.error };
      } else {
        delete errors[fieldName];
      }

      this.setState({
        errors: errors
      });
    }
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };

    switch (e.target.name) {
      case "creation_date":
        valResult = validateDateRequired(e.target.value);
        break;
      // case "name":
      //   valResult = validateName(e.target.value);
      //   break;
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

    const publicationData = {
      date: this.state.creation_date,
      name: this.state.name,
      selectiveProcess_id: this.state.selectiveProcess_id,
      call_id: this.state.call_id ? this.state.call_id : null,
      step_id: this.state.step_id ? this.state.step_id : null,
      description: this.state.description ? this.state.description : null,
      publicationType_id: this.state.publicationType_id,
      file: this.state.file,
      valid: this.state.valid
    };

    const valRoleType = validatePublicationForm(publicationData);
    if (!valRoleType.isValid) {
      this.setState({ errors: valRoleType.errors });
    } else {
      this.props.createPublication(publicationData, () => {
        this.props.history.push(`/processes/${this.state.selectiveProcess_id}`);
      });
    }
  }

  renderForm(errors, processOptions, callOptions, stepOptions, processPublicationTypeOptions) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Criar publicação</h4>
        </div>

        <div className="card-body">
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="date"
              name="creation_date"
              label="Lançamento: *"
              placeholder="Data da publicação"
              value={this.state.creation_date}
              onChange={this.onChange}
              error={errors.creation_date}
            />

            <SelectListGroup
              placeholder="* Selecione o tipo de publicação"
              name="publicationType_id"
              label="Tipo: *"
              value={this.state.publicationType_id}
              options={processPublicationTypeOptions}
              onChange={this.onChange}
              error={errors.publicationType_id}
            />

            <SelectListGroup
              placeholder="* Selecione o processo seletivo"
              name="selectiveProcess_id"
              label="Processo: *"
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
                label="Chamada: *"
                value={this.state.call_id}
                options={callOptions}
                onChange={this.onChange}
                error={errors.call_id}
                disabled={this.state.lock_call ? true : false}
              />
            ) : (
              ""
            )}

            {this.state.call_id ? (
              <SelectListGroup
                placeholder="* Selecione a etapa"
                name="step_id"
                label="Etapa: *"
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
              label="Observações:"
              placeholder="Observações sobre a publicação"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
            />

            <FileFieldGroup name="file" label="Arquivo: *" info="Apenas arquivos to tipo pdf." error={errors.file} onChange={this.onChangeFile} />

            <CheckBoxFieldGroup
              id="valid-checkbox"
              name="valid"
              text="Validade:"
              value="Este documento é a versão mais recente de seu tipo."
              checked={this.state.valid}
              error={errors.valid}
              info="Documentos mais antigos devem ser atualizados manualmente."
              onChange={this.onCheck}
            />

            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }

  render() {
    //load raw data
    const { errors, selectiveProcess } = this.state;
    const process_id = this.props.match.params.process_id;
    const { publicationTypeStore } = this.props;

    //mounting data structures
    const publicationTypes = publicationTypeStore.publicationTypes !== null && !publicationTypeStore.loading ? publicationTypeStore.publicationTypes : [];

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
      publicationTypes
        ? publicationTypes.map(procPubTypes => {
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

    return (
      <div className="publication-create">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${process_id}`} className="btn btn-light">
                Voltar para processo seletivo
              </Link>
              <h1 className="display-4">Publicação</h1>
              {this.renderForm(errors, processOptions, callOptions, stepOptions, processPublicationTypeOptions)}
              {alertsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PublicationCreate.proptypes = {
  getProcess: PropTypes.func.isRequired,
  getPublicationTypes: PropTypes.func.isRequired,
  createPublication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  process: state.process,
  publicationTypeStore: state.publicationTypeStore
});

export default connect(
  mapStateToProps,
  {
    getPublicationTypes,
    createPublication,
    getProcess
  }
)(PublicationCreate);
