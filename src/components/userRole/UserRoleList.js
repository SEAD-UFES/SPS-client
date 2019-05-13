import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { isEmpty } from "validation";
import { getUserRoles } from "./userRoleActions";
import Spinner from "components/common/Spinner";

class UserRoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      userRoleList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.getUserRoles();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.userRoleStore.userRoles) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          userRoleList: nextProps.userRoleStore.userRoles
        },
        () => {
          this.sortBy("user", { reverse: false });
        }
      );
    }
  }

  sortBy(key = "user", options) {
    let sortMethod = this.state.sortMethod;
    let sortReverse = this.state.sortReverse;
    let arrayCopy = [...this.state.userRoleList];

    //Determinar se é ordem é forçada.
    if (options && !isEmpty(options.reverse)) {
      sortReverse = options.reverse;
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true;
      }
    }

    const compareByUser = (a, b) => {
      if (a.User.login.toLowerCase() < b.User.login.toLowerCase()) return -1;
      if (a.User.login.toLowerCase() > b.User.login.toLowerCase()) return 1;
      return 0;
    };

    const compareByRoleType = (a, b) => {
      if (a.RoleType.name.toLowerCase() < b.RoleType.name.toLowerCase()) return -1;
      if (a.RoleType.name.toLowerCase() > b.RoleType.name.toLowerCase()) return 1;
      return 0;
    };

    const compareByCourse = (a, b) => {
      const A = a.RoleType.global ? "Papel global" : !isEmpty(a.Course) ? a.Course.name : "";
      const B = b.RoleType.global ? "Papel global" : !isEmpty(b.Course) ? b.Course.name : "";

      if (A.toLowerCase() < B.toLowerCase()) return -1;
      if (A.toLowerCase() > B.toLowerCase()) return 1;
      return 0;
    };

    switch (key) {
      case "user":
        arrayCopy.sort(compareByUser);
        break;
      case "role":
        arrayCopy.sort(compareByRoleType);
        break;
      case "course":
        arrayCopy.sort(compareByCourse);
        break;
      default:
    }

    if (sortReverse) {
      arrayCopy.reverse();
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      userRoleList: arrayCopy
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
    const { userRoleStore } = this.props;
    const { userRoleList } = this.state;

    const userRolesTable =
      userRoleStore.userRoles === null || userRoleStore.loading ? (
        <Spinner />
      ) : userRoleList.length > 0 ? (
        <div>
          <h4 className="mb-2">Lista de atribuições de papel</h4>
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("user")}>Usuário {this.orderIcon("user")}</th>
                <th onClick={() => this.sortBy("role")}>Atribuição {this.orderIcon("role")}</th>
                <th onClick={() => this.sortBy("course")}>Curso {this.orderIcon("course")}</th>
                <th>
                  <Link className="text-success" to={`${this.props.match.url}/create`}>
                    <i className="fas fa-plus-circle" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {userRoleList.map(userRole => {
                return (
                  <tr key={userRole.id}>
                    <td>
                      <Link to={`/users/${userRole.User.id}`}>{userRole.User.login}</Link>
                    </td>
                    <td>
                      <Link to={`/parameters/roletypes/${userRole.RoleType.id}`}>{userRole.RoleType.name}</Link>
                    </td>
                    <td>{userRole.RoleType.global ? "Papel global" : userRole.Course ? userRole.Course.name : <span className="text-muted">n/a</span>}</td>
                    <td>
                      <Link className="text-danger" to={`${this.props.match.url}/${userRole.id}/delete`}>
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
            Sem atribuições de papel cadastrados.{" "}
            <Link className="text-success" to={`${this.props.match.url}/create`}>
              <i className="fas fa-plus-circle" />
              Adicionar
            </Link>
          </p>
        </div>
      );

    const addButton = (
      <div className="btn-group mb-4" role="group">
        <Link to={`${this.props.match.url}/create`} className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" />
          Adicionar atribuição de papel
        </Link>
      </div>
    );

    return (
      <div className="userRole-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Atribuições de papel</h1>
              <p className="lead text-muted">Atribuições de papel a usuários do sistema</p>
              {addButton}
              {userRolesTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserRoleList.proptypes = {
  getUserRoles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userRoleStore: state.userRoleStore
});

export default connect(
  mapStateToProps,
  {
    getUserRoles
  }
)(UserRoleList);
