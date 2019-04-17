import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createStepType, getStepTypes, updateStepType, deleteStepType } from "./stepTypeActions";
import { clearErrors } from "actions/errorActions";
import { compareBy } from "utils/compareBy";
import StepTypeModalForm from "./StepTypeModalForm";
import StepTypeModalDelete from "./StepTypeModalDelete";

class StepTypesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      stepTypeList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getStepTypes();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.stepTypeStore.stepTypes) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          stepTypeList: nextProps.stepTypeStore.stepTypes
        },
        () => this.sortBy("name", { reverse: false })
      );
    }
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

  sortBy(key = "name", options) {
    let sortMethod = this.state.sortMethod;
    let sortReverse = this.state.sortReverse;
    let arrayCopy = [...this.state.stepTypeList];

    //Determinar se é ordem é forçada.
    if (options && options.reverse) {
      sortReverse = options.reverse;
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true;
      }
    }

    arrayCopy.sort(compareBy(key));

    if (sortReverse) {
      arrayCopy.reverse();
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      stepTypeList: arrayCopy
    });
  }

  orderIcon(key) {
    if (this.state.sortMethod === key) {
      if (this.state.sortReverse === false) {
        return <i className="fas fa-arrow-up" />;
      } else {
        return <i className="fas fa-arrow-down" />;
      }
    }
    return null;
  }

  render() {
    const { stepTypeList } = this.state;

    //Add item - form
    const addItemTool = (
      <div>
        <div className="mb-2">
          <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addModal">
            + Adicionar tipo de etapa
          </button>
        </div>

        <StepTypeModalForm mode="add" targetName="addModal" addFunction={this.props.createStepType} reloadFunction={this.props.getStepTypes} />
      </div>
    );

    //item list
    const stepTypesTable = (
      <div>
        <h4 className="mb-2">Lista de tipos de estapa</h4>
        {stepTypeList ? (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>Nome {this.orderIcon("name")}</th>
                <th>Descrição</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {stepTypeList.length > 0 ? (
                stepTypeList.map(stepType => {
                  return (
                    <tr key={stepType.id}>
                      <td>{stepType.name}</td>
                      <td>{stepType.description ? stepType.description : ""}</td>
                      <td>
                        <button type="button" className="btn btn-link buttonAsLink text-info" data-toggle="modal" data-target={`#editModal-${stepType.id}`}>
                          <i className="fas fa-cog" />
                        </button>
                        <StepTypeModalForm
                          targetName={`editModal-${stepType.id}`}
                          mode="edit"
                          item={stepType}
                          editFunction={this.props.updateStepType}
                          reloadFunction={this.props.getStepTypes}
                        />{" "}
                        <button type="button" className="btn btn-link buttonAsLink text-danger" data-toggle="modal" data-target={`#deleteModal-${stepType.id}`}>
                          <i className="fas fa-times-circle" />
                        </button>
                        <StepTypeModalDelete
                          targetName={`deleteModal-${stepType.id}`}
                          item={stepType}
                          deleteFunction={this.props.deleteStepType}
                          reloadFunction={this.props.getStepTypes}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">Sem itens para exibir</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan="3">Sem itens para exibir</td>
          </tr>
        )}
      </div>
    );

    return (
      <div className="stepTypes">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Tipos de etapa</h1>
              <p className="lead text-muted">Tipos de etapa disponíveis dentro do sistema</p>
              {addItemTool}
              {stepTypesTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepTypesList.proptypes = {
  getStepTypes: PropTypes.func.isRequired,
  createStepType: PropTypes.func.isRequired,
  updateStepType: PropTypes.func.isRequired,
  deleteStepType: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stepTypeStore: state.stepTypeStore
});

export default connect(
  mapStateToProps,
  {
    getStepTypes,
    createStepType,
    updateStepType,
    deleteStepType,
    clearErrors
  }
)(StepTypesList);
