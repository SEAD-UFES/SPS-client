import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createPublicationType, getPublicationTypes, deletePublicationType, updatePublicationType } from "./publicationTypeActions";
import { clearErrors } from "actions/errorActions";
import { compareBy } from "utils/compareBy";
import PublicationTypeModalForm from "./PublicationTypeModalForm";
import PublicationTypeModalDelete from "./PublicationTypeModalDelete";

class ProcessPublicationTypesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      publicationTypeList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getPublicationTypes();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.publicationTypeStore.publicationTypes) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          publicationTypeList: nextProps.publicationTypeStore.publicationTypes
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
    let arrayCopy = [...this.state.publicationTypeList];

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
      publicationTypeList: arrayCopy
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
    const { publicationTypeList } = this.state;

    //Add item - form
    const addItemTool = (
      <div>
        <div className="mb-2">
          <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addModal">
            + Adicionar tipo de publicação
          </button>
        </div>

        <PublicationTypeModalForm
          mode="add"
          targetName="addModal"
          addFunction={this.props.createPublicationType}
          reloadFunction={this.props.getPublicationTypes}
        />
      </div>
    );

    //item list
    const publicationTypesTable = (
      <div>
        <h4 className="mb-2">Lista de tipos de papel</h4>
        {publicationTypeList ? (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>Nome {this.orderIcon("name")}</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {publicationTypeList.length > 0 ? (
                publicationTypeList.map(publicationType => {
                  return (
                    <tr key={publicationType.id}>
                      <td>{publicationType.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-info"
                          data-toggle="modal"
                          data-target={`#editModal-${publicationType.id}`}
                        >
                          <i className="fas fa-cog" />
                        </button>
                        <PublicationTypeModalForm
                          targetName={`editModal-${publicationType.id}`}
                          mode="edit"
                          item={publicationType}
                          editFunction={this.props.updatePublicationType}
                          reloadFunction={this.props.getPublicationTypes}
                        />{" "}
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-danger"
                          data-toggle="modal"
                          data-target={`#deleteModal-${publicationType.id}`}
                        >
                          <i className="fas fa-times-circle" />
                        </button>
                        <PublicationTypeModalDelete
                          targetName={`deleteModal-${publicationType.id}`}
                          item={publicationType}
                          deleteFunction={this.props.deletePublicationType}
                          reloadFunction={this.props.getPublicationTypes}
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
      <div className="publicationTypes">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Tipos de publicação</h1>
              <p className="lead text-muted">Tipos de publicação efetuadas dentro do sistema</p>
              {addItemTool}
              {publicationTypesTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProcessPublicationTypesList.proptypes = {
  getPublicationTypes: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  createPublicationType: PropTypes.func.isRequired,
  updatePublicationType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  publicationTypeStore: state.publicationTypeStore
});

export default connect(
  mapStateToProps,
  {
    getPublicationTypes,
    clearErrors,
    createPublicationType,
    deletePublicationType,
    updatePublicationType
  }
)(ProcessPublicationTypesList);
