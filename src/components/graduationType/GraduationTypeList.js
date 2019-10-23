import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createGraduationType, getGraduationTypes, updateGraduationType, deleteGraduationType } from "./graduationTypeActions";
import { clearErrors } from "actions/errorActions";
import { compareBy } from "utils/compareBy";
import GraduationTypeModalForm from "./GraduationTypeModalForm";
import GraduationTypeModalDelete from "./GraduationTypeModalDelete";

class GraduationTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      graduationTypeList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getGraduationTypes();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.graduationTypeStore.graduationTypes) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          graduationTypeList: nextProps.graduationTypeStore.graduationTypes
        },
        () => this.sortBy("name", { reverse: false })
      );
    }
  }

  sortBy(key = "name", options) {
    let sortMethod = this.state.sortMethod;
    let sortReverse = this.state.sortReverse;
    let arrayCopy = [...this.state.graduationTypeList];

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
      graduationTypeList: arrayCopy
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
    const { graduationTypeList } = this.state;

    //Add item - form
    const addItemTool = (
      <div>
        <div className="mb-2">
          <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addModal">
            + Adicionar nível de formação
          </button>
        </div>

        <GraduationTypeModalForm
          mode="add"
          targetName="addModal"
          addFunction={this.props.createGraduationType}
          reloadFunction={this.props.getGraduationTypes}
        />
      </div>
    );

    //item list
    const graduationTypesTable = (
      <div>
        <h4 className="mb-2">Lista de niveis de formação</h4>
        {graduationTypeList ? (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>Nome {this.orderIcon("name")}</th>
                {/* <th>Descrição</th> */}
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {graduationTypeList.length > 0 ? (
                graduationTypeList.map(graduationType => {
                  return (
                    <tr key={graduationType.id}>
                      <td>{graduationType.name}</td>
                      {/* <td>{graduationType.description ? graduationType.description : ""}</td> */}
                      <td>
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-info"
                          data-toggle="modal"
                          data-target={`#editModal-${graduationType.id}`}
                        >
                          <i className="fas fa-cog" />
                        </button>
                        <GraduationTypeModalForm
                          targetName={`editModal-${graduationType.id}`}
                          mode="edit"
                          item={graduationType}
                          editFunction={this.props.updateGraduationType}
                          reloadFunction={this.props.getGraduationTypes}
                        />{" "}
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-danger"
                          data-toggle="modal"
                          data-target={`#deleteModal-${graduationType.id}`}
                        >
                          <i className="fas fa-times-circle" />
                        </button>
                        <GraduationTypeModalDelete
                          targetName={`deleteModal-${graduationType.id}`}
                          item={graduationType}
                          deleteFunction={this.props.deleteGraduationType}
                          reloadFunction={this.props.getGraduationTypes}
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
      <div className="graduationTypes">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Níveis de formação</h1>
              <p className="lead text-muted">Níveis de formação disponíveis dentro do sistema</p>
              {addItemTool}
              {graduationTypesTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GraduationTypeList.proptypes = {
  getGraduationTypes: PropTypes.func.isRequired,
  createGraduationType: PropTypes.func.isRequired,
  updateGraduationType: PropTypes.func.isRequired,
  deleteGraduationType: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  graduationTypeStore: state.graduationTypeStore
});

export default connect(
  mapStateToProps,
  {
    getGraduationTypes,
    createGraduationType,
    updateGraduationType,
    deleteGraduationType,
    clearErrors
  }
)(GraduationTypeList);
