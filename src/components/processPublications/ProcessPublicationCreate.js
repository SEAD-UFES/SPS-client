import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import TextFieldGroup from "components/common/TextFieldGroup";
import SelectListGroup from "components/common/SelectListGroup";
import TextAreaFieldGroup from "components/common/TextAreaFieldGroup";
import FileFieldGroup from "../common/FileFieldGroup";

import { createProcessPublication } from "./processPublicationsActions";
import { getProcessPublicationTypes } from "components/processPublicationTypes/processPublicationTypesActions";

import { validateDateRequired, validateName } from "validation";
import { validateProcessPublicationForm } from "./validateProcessPublicationForm";
import { validateFileType } from "../../validation";

class ProcessPublicationCreate extends Component {
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

      selectiveProcess: "",

      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    //get process from link
    if (
      this.props.location.state &&
      this.props.location.state.selectiveProcess
    ) {
      this.setState({
        selectiveProcess_id: this.props.location.state.selectiveProcess.id,
        selectiveProcess: this.props.location.state.selectiveProcess
      });
    }
  }

  componentDidMount() {
    this.props.getProcessPublicationTypes();
  }

  componentWillReceiveProps(nextProps) {
    //errors
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
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
      publicationType_id: this.state.publicationType_id,
      file: this.state.file,
      valid: this.state.valid
    };

    const valRoleType = validateProcessPublicationForm(publicationData);
    if (!valRoleType.isValid) {
      this.setState({ errors: valRoleType.errors });
    } else {
      this.props.createProcessPublication(publicationData, () => {
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
      processPublicationTypesStore.processPublicationTypes !== null &&
      !processPublicationTypesStore.loading
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
    const processPublicationTypeOptions = [
      { label: "* Selecione o tipo de publicação", value: "" }
    ].concat(
      processPublicationTypes
        ? processPublicationTypes.map(procPubTypes => {
            return {
              label: procPubTypes.name,
              value: procPubTypes.id
            };
          })
        : []
    );

    const processOptions = [
      { label: "* Selecione o processo seletivo", value: "" }
    ].concat(
      processes
        ? processes.map(process => {
            return {
              label: `${process.number}/${process.year} - ${
                process.Course.name
              }`,
              value: process.id
            };
          })
        : []
    );

    const callOptions = [{ label: "* Selecione a chamada", value: "" }].concat(
      calls
        ? calls.map(call => {
            return {
              label: `${call.number}`,
              value: `${call.id}`
            };
          })
        : []
    );

    const stepOptions = [{ label: "* Selecione a etapa", value: "" }].concat(
      steps
        ? steps.map(step => {
            return {
              label: `${step.StepType.name}`,
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

        {/* <TextFieldGroup
          type="text"
          name="name"
          placeholder="* Nome da publicação"
          value={this.state.name}
          onChange={this.onChange}
          error={errors.name}
        /> */}

        <SelectListGroup
          placeholder="* Selecione o processo seletivo"
          name="selectiveProcess_id"
          value={this.state.selectiveProcess_id}
          options={processOptions}
          onChange={this.onChange}
          error={errors.selectiveProcess_id}
          disabled={this.state.selectiveProcess ? true : false}
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

        <FileFieldGroup
          name="file"
          error={errors.file}
          onChange={this.onChangeFile}
        />

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="valid"
            id="valid"
            checked={this.state.valid}
            onChange={this.onCheck}
          />
          <label className="form-check-label" htmlFor="valid">
            Documento atualizado
          </label>
        </div>

        <input type="submit" className="btn btn-info btn-block mt-4" />
      </form>
    );

    return (
      <div className="publication-create">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${process_id}`} className="btn btn-light">
                Voltar para processo seletivo
              </Link>
              <h1 className="display-4 text-center">Criar publicação</h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>
              {publicationForm}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProcessPublicationCreate.proptypes = {
  getProcessPublicationTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  processPublicationTypesStore: state.processPublicationTypesStore
});

export default connect(
  mapStateToProps,
  {
    getProcessPublicationTypes,
    createProcessPublication
  }
)(ProcessPublicationCreate);
