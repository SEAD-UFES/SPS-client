import React, { Component } from "react";
import { Link } from "react-router-dom";

import TextFieldGroup from "components/common/TextFieldGroup";
import SelectListGroup from "components/common/SelectListGroup";
import TextAreaFieldGroup from "components/common/TextAreaFieldGroup";
import FileFieldGroup from "components/common/FileFieldGroup";

class ProcessPublicationCreate extends Component {
  constructor() {
    super();
    this.state = {
      creation_date: "",
      name: "",
      selectiveProcess_id: "",
      call_id: "",
      step_id: "",
      publicationType_id: "",
      description: "",

      file: null,
      fileUrl: null,

      selectiveProcess: "",

      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
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

  onChangeFile(e) {
    e.preventDefault();

    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = e => {
      this.setState({
        file: file,
        fileUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };

    // switch (e.target.name) {
    //   case "":
    //     valResult = { error: "", isValid: true };
    //     break;
    //   default:
    //     break;
    // }

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
      creation_date: this.state.creation_date,
      name: this.state.name,
      selectiveProcess_id: this.state.selectiveProcess_id,
      call_id: this.state.call_id,
      step_id: this.state.step_id,
      publicationType_id: this.state.publicationType_id,
      fileUrl: this.state.fileUrl
    };

    console.log(publicationData);

    // const valRoleType = validatePermAssigForm(permissionAssignmentData);
    // if (!valRoleType.isValid) {
    //   this.setState({ errors: valRoleType.errors });
    // } else {
    //   this.props.createPermissionAssignment(permissionAssignmentData, () => {
    //     this.props.history.push(`/roletypes/${this.state.roleType_id}`);
    //   });
    // }
  }

  render() {
    const { errors } = this.state;
    const process_id = this.props.match.params.process_id;

    const processes = this.state.selectiveProcess
      ? [this.state.selectiveProcess]
      : [];

    const calls = this.state.selectiveProcess
      ? this.state.selectiveProcess.Calls
      : [];

    const steps =
      this.state.selectiveProcess && this.state.call_id
        ? this.state.selectiveProcess.Calls.filter(item => {
            return item.id === this.state.call_id;
          })[0].Steps
        : [];

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

    console.log(steps);
    const stepOptions = [{ label: "* Selecione a etapa", value: "" }].concat(
      steps
        ? steps.map(step => {
            return {
              label: `${step.id}`,
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

        <TextFieldGroup
          type="text"
          name="name"
          placeholder="* Nome da publicação"
          value={this.state.name}
          onChange={this.onChange}
          error={errors.name}
        />

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

        {/* <FileFieldGroup
          name="file"
          value={this.state.file}
          onChange={this.onChangeFile}
          error={errors.files}
        /> */}

        <div className="form-group">
          <input
            style={{ paddingBottom: "43px" }}
            type="file"
            className={"form-control form-control-lg"}
            onChange={this.onChangeFile}
          />
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="active"
            id="active"
            onChange={this.onCheck}
          />
          <label className="form-check-label" htmlFor="active">
            Documento atualizado
          </label>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="hideprocess"
            id="hideprocess"
          />
          <label className="form-check-label" htmlFor="hideprocess">
            Tornar obsoletas outras publicações do mesmo tipo e nível
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

export default ProcessPublicationCreate;
