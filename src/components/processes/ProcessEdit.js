import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {
  isEmpty,
  validateProcessNumber,
  validateYearRequired,
  validateDescription,
  validateProcessForm,
  validateId
} from "../../validation";

import { clearErrors } from "../../actions/errorActions";
import { getProcess, updateProcess } from "../../actions/processActions";
import { getCourses } from "../parameters/courses/coursesActions";

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
    if (isEmpty(nextProps.errors) && nextProps.process.process) {
      const process = nextProps.process.process;
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
      description: this.state.description,
      visible: this.state.visible
    };

    const valProcess = validateProcessForm(processData);
    if (!valProcess.isValid) {
      this.setState({ errors: valProcess.errors });
    } else {
      this.props.updateProcess(
        this.props.match.params.id,
        processData,
        this.props.history
      );
    }
  }

  render() {
    const { errors } = this.state;
    const { coursesStorage } = this.props;

    const courseOptions = [{ label: "Escolha o curso", value: "" }].concat(
      coursesStorage.courses
        ? coursesStorage.courses.map(course => {
            return {
              label: course.name,
              value: course.id
            };
          })
        : []
    );

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/processes/${this.props.match.params.id}`}
                className="btn btn-light"
              >
                Voltar para o processo
              </Link>
              <h1 className="display-4 text-center">Editar processo</h1>
              <p className="lead text-center">Altere os dados básicos</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  name="number"
                  placeholder="* Número"
                  value={this.state.number}
                  onChange={this.onChange}
                  error={errors.number}
                />

                <TextFieldGroup
                  type="text"
                  name="year"
                  placeholder="* Ano"
                  value={this.state.year}
                  onChange={this.onChange}
                  error={errors.year}
                />

                <SelectListGroup
                  placeholder=""
                  name="course_id"
                  value={this.state.course_id}
                  options={courseOptions}
                  onChange={this.onChange}
                  error={errors.course_id}
                />

                <TextAreaFieldGroup
                  placeholder="* Descrição"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Apresentação básica do processo seletivo"
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="visible"
                    id="visible"
                    checked={this.state.visible}
                    onChange={this.onCheck}
                  />
                  <label className="form-check-label" htmlFor="visible">
                    Tornar processo visível
                  </label>
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
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
  errors: state.errors,
  process: state.process,
  coursesStorage: state.coursesStorage
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { clearErrors, getProcess, updateProcess, getCourses }
)(withRouter(ProcessEdit));
