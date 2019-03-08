import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getRoleTypes } from "./roleTypesActions";
import { compareBy } from "utils/compareBy";
import Spinner from "components/common/Spinner";

class RoleTypesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      roleTypesList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.getRoleTypes();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.roleTypesStore.roleTypes) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          roleTypesList: nextProps.roleTypesStore.roleTypes
        },
        () => this.sortBy("name", { reverse: false })
      );
    }
  }

  sortBy(key = "name", options) {
    let sortMethod = this.state.sortMethod;
    let sortReverse = this.state.sortReverse;
    let arrayCopy = [...this.state.roleTypesList];

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
      roleTypesList: arrayCopy
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
    const { roleTypesStore } = this.props;
    const { roleTypesList } = this.state;

    const roleTypesTable =
      roleTypesStore.roleTypes === null || roleTypesStore.loading ? (
        <Spinner />
      ) : roleTypesList.length > 0 ? (
        <div>
          <h4 className="mb-2">Lista de tipos de papel</h4>
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>
                  Nome {this.orderIcon("name")}
                </th>
                <th onClick={() => this.sortBy("description")}>
                  Descrição {this.orderIcon("description")}
                </th>
                <th>
                  <Link className="text-success" to="/roletypes/create">
                    <i className="fas fa-plus-circle" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {roleTypesList.map(roleType => {
                return (
                  <tr key={roleType.id}>
                    <td>{roleType.name}</td>
                    <td>{roleType.description}</td>
                    <td>
                      <Link
                        className="text-success"
                        to={`/roletypes/${roleType.id}`}
                      >
                        <i className="fas fa-eye" />
                      </Link>{" "}
                      <Link
                        className="text-info"
                        to={`/roletypes/${roleType.id}/update`}
                      >
                        <i className="fas fa-cog" />
                      </Link>{" "}
                      <Link
                        className="text-danger"
                        to={`/roletypes/${roleType.id}/delete`}
                      >
                        <i className="fas fa-times-circle" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>
            Sem tipos de papel cadastrados.{" "}
            <Link className="text-success" to="/roletypes/create">
              <i className="fas fa-plus-circle" />
              Adicionar
            </Link>
          </p>
        </div>
      );

    const addButton = (
      <div className="btn-group mb-4" role="group">
        <Link to="/roletypes/create" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" />
          Adicionar tipo de papel
        </Link>
      </div>
    );

    return (
      <div className="assignments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Tipos de papel</h1>
              <p className="lead text-muted">
                Papéis que podem ser atribuidos a usuários dentro do sistema
              </p>
              {addButton}
              {roleTypesTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoleTypesList.proptypes = {
  getRoleTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleTypesStore: state.roleTypesStore
});

export default connect(
  mapStateToProps,
  {
    getRoleTypes
  }
)(RoleTypesList);
