import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { clearErrors } from "../../../actions/errorActions";
import {
  getRegions,
  createRegion,
  updateRegion,
  deleteRegion
} from "./regionsActions";
import { compareBy } from "utils/compareBy";
import RegionsModalForm from "./RegionsModalForm";
import RegionsModalDelete from "./RegionsModalDelete";

class RegionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      regionsList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getRegions();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.regionsStore.regions) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          regionsList: nextProps.regionsStore.regions
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
    let arrayCopy = [...this.state.regionsList];

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
      regionsList: arrayCopy
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
    const { regionsList } = this.state;

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
            + Adicionar região
          </button>
        </div>

        <RegionsModalForm
          mode="add"
          targetName="addModal"
          addFunction={this.props.createRegion}
          reloadFunction={this.props.getRegions}
        />
      </div>
    );

    //item list
    const regionsTable = (
      <div>
        <h4 className="mb-2">Lista de regiões</h4>
        {RegionsList ? (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>
                  Nome {this.orderIcon("name")}
                </th>
                <th onClick={() => this.sortBy("description")}>
                  Descrição {this.orderIcon("description")}
                </th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {regionsList.length > 0 ? (
                regionsList.map(region => {
                  return (
                    <tr key={region.id}>
                      <td>{region.name}</td>
                      <td>
                        {region.description ? (
                          region.description
                        ) : (
                          <span className="text-muted">Sem descrição.</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-info"
                          data-toggle="modal"
                          data-target={`#editModal-${region.id}`}
                        >
                          <i className="far fa-edit" />
                        </button>
                        <RegionsModalForm
                          targetName={`editModal-${region.id}`}
                          mode="edit"
                          item={region}
                          editFunction={this.props.updateRegion}
                          reloadFunction={this.props.getRegions}
                        />{" "}
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink"
                          data-toggle="modal"
                          data-target={`#deleteModal-${region.id}`}
                        >
                          <i className="far fa-trash-alt text-danger" />
                        </button>
                        <RegionsModalDelete
                          targetName={`deleteModal-${region.id}`}
                          item={region}
                          deleteFunction={this.props.deleteRegion}
                          reloadFunction={this.props.getRegions}
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
      <div className="regions">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Regiões</h1>
              <p className="lead text-muted">
                Regiões que serão ofertadas pelo sistema
              </p>
              {addItemTool}
              {regionsTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegionsList.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getRegions: PropTypes.func.isRequired,
  createRegion: PropTypes.func.isRequired,
  updateRegion: PropTypes.func.isRequired,
  deleteRegion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  regionsStore: state.regionsStore
});

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getRegions,
    createRegion,
    updateRegion,
    deleteRegion
  }
)(RegionsList);
