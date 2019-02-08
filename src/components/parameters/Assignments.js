import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import TextFieldAreaGroup from "../common/TextAreaFieldGroup";

import { clearErrors } from "../../actions/errorActions";
import { getAssignmentOptions } from "../../actions/processActions";
import { createAssignment } from "../../actions/parameterActions";

class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //comportamento do componente
      add_item: false,

      //dados do item
      item_list: [],

      //errors:
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getAssignmentOptions();
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "new_item":
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
  }

  render() {
    const { assignments } = this.props;

    //Add item - form
    const addItemTool = (
      <div>
        <div className="mb-2">
          <button
            type="button"
            className="btn btn-info"
            data-toggle="modal"
            data-target="#addModal"
          >
            + Adicionar atribuição
          </button>
        </div>

        <ItemFormModal
          mode="add"
          targetName="addModal"
          addFunction={this.props.createAssignment}
        />
      </div>
    );

    //item list
    const assignmentsList = (
      <div>
        <h4 className="mb-2">Lista de atribuições</h4>
        {assignments ? (
          <table className="table">
            <thead>
              <tr>
                <th>Atribuição</th>
                <th>Descrição</th>
                <th>Ferramentas</th>
              </tr>
            </thead>
            <tbody>
              {assignments
                ? assignments.map(assignment => {
                    return (
                      <tr key={assignment.id}>
                        <td>{assignment.name}</td>
                        <td>
                          {assignment.description ? (
                            assignment.description
                          ) : (
                            <span className="text-muted">Sem descrição.</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="modal"
                            data-target={`#editModal-${assignment.id}`}
                          >
                            Editar
                          </button>
                          <ItemFormModal
                            targetName={`editModal-${assignment.id}`}
                            mode="edit"
                            item={assignment}
                          />
                        </td>
                      </tr>
                    );
                  })
                : "Nope"}
            </tbody>
          </table>
        ) : (
          <p>Sem itens para exibir</p>
        )}
      </div>
    );

    return (
      <div className="assignments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Atribuições</h1>
              <p className="lead text-muted">
                Que tipo de vagas oferecemos nos processos seletivos
              </p>
              {addItemTool}
              {assignmentsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Assignments.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getAssignmentOptions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  assignments: state.process.assignments
});

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getAssignmentOptions,
    createAssignment
  }
)(Assignments);

//##############################################################################################
class ItemFormModal extends Component {
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
  }

  onChange(e) {
    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {
    //building assignment
    const assignmentData = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description
    };

    //if add stance
    if (this.state.mode === "add") {
      this.props.addFunction(assignmentData, () => {
        window.$(`#${this.props.targetName}`).modal("hide");
      });
    }

    //if edit stance
    if (this.state.mode === "edit") {
      this.props.editFunction(assignmentData, () => {
        window.$(`#${this.props.targetName}`).modal("hide");
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div
        className="modal fade"
        id={this.props.targetName}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.mode === "edit"
                  ? "Editar atribuição"
                  : "Adicionar atribuição"}
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
                      error={errors.number}
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
