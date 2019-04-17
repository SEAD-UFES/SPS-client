import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isEmpty } from "../../validation";
import { clearErrors } from "../../actions/errorActions";
import Alert from "../common/Alert";

class StepTypeModalDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //errors
      errors: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    window.$(`#${this.props.targetName}`).on("hidden.bs.modal", () => {
      this.resetState();
      this.props.reloadFunction();
    });
  }

  componentWillReceiveProps(nextProps) {
    //error management
    if (!isEmpty(nextProps.errors)) {
      let newErrors = [];
      switch (nextProps.errors.code) {
        case "assignments-02":
          newErrors = {};
          if (nextProps.errors.devMessage.name === "SequelizeForeignKeyConstraintError") {
            newErrors.stepType = "A atribuição está em uso dentro do sistema.";
            this.setState({ errors: newErrors });
          }
          break;
        default:
          return null;
      }
    } else {
      this.setState({ errors: [] });
    }
  }

  onSubmit() {
    this.props.deleteFunction(this.props.item.id, () => {
      window.$(`#${this.props.targetName}`).modal("hide");
    });
  }

  resetState() {
    this.setState({
      errors: []
    });
    this.props.clearErrors();
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
              <h5 className="modal-title" id={`${this.props.targetName}-ModalLabel`}>
                Excluir curso
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Alert message={errors.stepType} />
              <p>
                <strong>Id: </strong>
                {this.props.item.id}
              </p>
              <p>
                <strong>Nome: </strong>
                {this.props.item.name}
              </p>
              <p>
                <strong>Descrição: </strong>
                {this.props.item.description ? this.props.item.description : ""}
              </p>
            </div>
            <div className="modal-footer">
              <input type="submit" className="btn btn-danger" onClick={this.onSubmit} value="Excluir" />

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

StepTypeModalDelete.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errorStore
});

export default connect(
  mapStateToProps,
  { clearErrors }
)(StepTypeModalDelete);
