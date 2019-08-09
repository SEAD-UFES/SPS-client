import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import CheckBoxFieldGroup from "components/common/CheckBoxFieldGroup";
import { isEmpty, validateProcessNumber, validateYearRequired, validateDescription, validateId } from "../../validation";
import { validateProcessForm } from "./validateProcessForm";
import { clearErrors } from "../../actions/errorActions";
import { getProcess, updateProcess } from "./processActions";
import { getCourses } from "../course/courseActions";

class ProcessEdit extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      year: "",
      course_id: "",
      description: "",
      visible: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params.id) {
      this.props.getProcess(this.props.match.params.id);
    }

    this.props.getCourses();
  }

  componentWillReceiveProps(nextProps) {
    //Tratando errors
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.processStore.process) {
      const process = nextProps.processStore.process;
      this.setState({
        number: process.number,
        year: process.year,
        course_id: process.course_id,
        description: process.description,
        visible: process.visible
      });
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "number":
        valResult = validateProcessNumber(e.target.value);
        break;
      case "year":
        valResult = validateYearRequired(e.target.value);
        break;
      case "course_id":
        valResult = validateId(e.target.value);
        break;
      case "description":
        valResult = validateDescription(e.target.value);
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

  onCheck(e) {
    //validação local dos campos
    let errors = this.state.errors;
    switch (e.target.name) {
      default:
        break;
    }

    this.setState({
      [e.target.name]: !this.state[e.target.name],
      errors: errors
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const processData = {
      number: this.state.number,
      year: this.state.year,
      course_id: this.state.course_id,
      description: this.state.description,
      visible: this.state.visible
    };

    const valProcess = validateProcessForm(processData);
    if (!valProcess.isValid) {
      this.setState({ errors: valProcess.errors });
    } else {
      this.props.updateProcess(this.props.match.params.id, processData, this.props.history);
    }
  }

  renderForm(state, errors, courseOptions) {
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Editar processo</h4>
        </div>

        <div className="card-body">
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              name="number"
              label="Número: *"
              placeholder="* Número"
              value={state.number}
              onChange={this.onChange}
              error={errors.number}
            />

            <TextFieldGroup type="text" name="year" label="Ano: *" placeholder="* Ano" value={this.state.year} onChange={this.onChange} error={errors.year} />

            <SelectListGroup
              placeholder=""
              name="course_id"
              label="Curso: *"
              value={this.state.course_id}
              options={courseOptions}
              onChange={this.onChange}
              error={errors.course_id}
            />

            <TextAreaFieldGroup
              placeholder="* Descrição"
              name="description"
              label="Descrição: *"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="Apresentação básica do processo seletivo"
            />

            <CheckBoxFieldGroup
              id="visible-checkbox"
              name="visible"
              text="Visibilidade:"
              value="Tornar processo visível"
              checked={this.state.visible}
              error={errors.visible}
              info=""
              onChange={this.onCheck}
            />

            <input type="submit" className="btn mt-4 btn-info btn-block" />
          </form>
        </div>
      </div>
    );
  }

  render() {
    const { errors } = this.state;
    const { courseStore } = this.props;

    const courseOptions = [{ label: "Escolha o curso", value: "" }].concat(
      courseStore.courses
        ? courseStore.courses.map(course => {
            return {
              label: course.name,
              value: course.id
            };
          })
        : []
    );

    return (
      <div className="process-edit">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Processo seletivo</h1>

              {this.renderForm(this.state, errors, courseOptions)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// "registerUser" and "auth" are required to the Register component
ProcessEdit.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getProcess: PropTypes.func.isRequired,
  updateProcess: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errorStore,
  processStore: state.processStore,
  courseStore: state.courseStore
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { clearErrors, getProcess, updateProcess, getCourses }
)(withRouter(ProcessEdit));
