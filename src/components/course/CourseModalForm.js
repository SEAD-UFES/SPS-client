import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import TextFieldAreaGroup from "../common/TextAreaFieldGroup";
import { isEmpty, validateName } from "../../validation";
import { validateCourseForm } from "./validateCourseForm";
import { clearErrors } from "../../actions/errorActions";
import SelectListGroup from "../common/SelectListGroup";

class CourseModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //component options
      mode: this.props.mode ? this.props.mode : "add",

      //item data
      id: this.props.item ? this.props.item.id : null,
      name: this.props.item ? this.props.item.name : "",
      description: this.props.item ? (this.props.item.description ? this.props.item.description : "") : "",
      graduationType_id: this.props.item ? (this.props.item.GraduationType ? this.props.item.GraduationType.id : "") : "",
      //errors
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    //aplly close on this modal. script
    window.$(`#${this.props.targetName}`).on("hidden.bs.modal", this.resetState);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //error management
    if (!isEmpty(nextProps.errors)) {
      let newErrors = [];
      switch (nextProps.errors.code) {
        case "courses-02":
          newErrors = {};
          if (nextProps.errors.devMessage.name === "SequelizeUniqueConstraintError") {
            if (nextProps.errors.devMessage.errors[0].message === "name must be unique") {
              newErrors.name = "Já existe uma curso com esse nome.";
              this.setState({ errors: newErrors });
            }
          }
          break;
        default:
          return null;
      }
    } else {
      this.setState({ errors: [] });
    }
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "graduationType_id":
        valResult = validateName(e.target.value);
        break;
      case "name":
        valResult = validateName(e.target.value);
        break;
      case "description":
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

  onSubmit() {
    //building assignment
    const courseData = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      graduationType_id: this.state.graduationType_id
    };

    //Form validation:
    const valCourse = validateCourseForm(courseData);
    if (!valCourse.isValid) {
      this.setState({ errors: valCourse.errors });
    } else {
      //if add stance
      if (this.state.mode === "add") {
        this.props.addFunction(courseData, () => {
          window.$(`#${this.props.targetName}`).modal("hide");
          this.setState({ name: "", description: "", graduationType_id: "" });
          this.props.reloadFunction();
        });
      }

      //if edit stance
      if (this.state.mode === "edit") {
        this.props.editFunction(courseData, () => {
          window.$(`#${this.props.targetName}`).modal("hide");
          this.props.reloadFunction();
        });
      }
    }
  }

  resetState() {
    this.setState({
      id: this.props.item ? this.props.item.id : null,
      name: this.props.item ? this.props.item.name : "",
      description: this.props.item ? (this.props.item.description ? this.props.item.description : "") : "",
      graduationType_id: this.props.item ? (this.props.item.GraduationType ? this.props.item.GraduationType.id : "") : "",
      //errors
      errors: []
    });
    this.props.clearErrors();
  }

  render() {
    const { errors } = this.state;
    const graduationTypes = this.props.graduationTypes;

    const graduationTypeOptions = [{ label: "Escolha o nível de graduação...", value: "" }].concat(
      graduationTypes
        ? graduationTypes.map(graduationType => {
          return {
            label: `${graduationType.name}`,
            value: graduationType.id
          };
        })
        : []
    );

    return (
      <div
        className="modal fade"
        id={this.props.targetName}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`${this.props.targetName}-ModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${this.props.targetName}-ModalLabel`}>
                {this.props.mode === "edit" ? "Editar curso" : "Adicionar curso"}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="">
                  <div className="form-group">
                    <SelectListGroup
                      placeholder="* Escolha o nível de graduação"
                      name="graduationType_id"
                      value={this.state.graduationType_id}
                      options={graduationTypeOptions}
                      onChange={this.onChange}
                      error={errors.graduationType_id}
                    />

                    <TextFieldGroup type="text" name="name" placeholder="* Nome" value={this.state.name} onChange={this.onChange} error={errors.name} />

                    <TextFieldAreaGroup
                      type="text"
                      name="description"
                      placeholder="Descrição"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <input type="submit" className="btn btn-info" onClick={this.onSubmit} value={this.props.mode === "edit" ? "Atualizar" : "Adicionar"} />

              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseModalForm.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errorStore
});

export default connect(
  mapStateToProps,
  { clearErrors }
)(CourseModalForm);
