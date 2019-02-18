import React, { Component } from "react";

import TextFieldGroup from "../../common/TextFieldGroup";
import TextFieldAreaGroup from "../../common/TextAreaFieldGroup";
import { validateName } from "../../../validation";
import { validateCoursesForm } from "./validateCoursesForm";

class CoursesModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //component options
      mode: this.props.mode ? this.props.mode : "add",

      //item data
      id: this.props.item ? this.props.item.id : null,
      name: this.props.item ? this.props.item.name : "",
      description: this.props.item
        ? this.props.item.description
          ? this.props.item.description
          : ""
        : "",
      //errors
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onChange(e) {
    //local validation of fields:
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "name":
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
      description: this.state.description
    };

    //Form validation:
    const valCourse = validateCoursesForm(courseData);
    if (!valCourse.isValid) {
      this.setState({ errors: valCourse.errors });
    } else {
      //if add stance
      if (this.state.mode === "add") {
        this.props.addFunction(courseData, () => {
          window.$(`#${this.props.targetName}`).modal("hide");
          this.setState({ name: "", description: "" });
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
      description: this.props.item
        ? this.props.item.description
          ? this.props.item.description
          : ""
        : "",
      //errors
      errors: []
    });
  }

  render() {
    const { errors } = this.state;
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
              <h5
                className="modal-title"
                id={`${this.props.targetName}-ModalLabel`}
              >
                {this.props.mode === "edit"
                  ? "Editar curso"
                  : "Adicionar curso"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="">
                  <div className="form-group">
                    <TextFieldGroup
                      type="text"
                      name="name"
                      placeholder="* Nome"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />

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
              <input
                type="submit"
                className="btn btn-info"
                onClick={this.onSubmit}
                value={this.props.mode === "edit" ? "Atualizar" : "Adicionar"}
              />

              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.resetState}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoursesModalForm;
