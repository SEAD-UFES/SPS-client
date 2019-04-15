import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: []
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.props.getUserList();
  }

  //componentWillReceiveProps(nextProps) {}

  onChangePage(page, pageSize) {
    //this.setState({ pageOfItems: pageOfItems });
    this.props.getUserList(page, pageSize);
  }

  render() {
    const { users, loading } = this.props.userStore;
    //const { users, loading } = { users: [], loading: false };
    let usersContent;

    if (users === null || loading) {
      usersContent = <Spinner />;
    } else {
      if (users.users.length > 0) {
        usersContent = (
          <div>
            <h4 className="mb-2">Usuários</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome/Sobrenome</th>
                  <th>Login/Email</th>
                  <th>Status</th>
                  <th>
                    <Link className="text-success" to={`${this.props.match.url}/create`}>
                      <i className="fas fa-plus-circle" />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.Person ? `${user.Person.name} ${user.Person.surname}` : `Sem nome`}</td>

                      <td>{user.login}</td>

                      <td>{user.authorized ? "Ativo" : "Desativado"}</td>

                      <td>
                        <Link className="text-success" to={`/users/${user.id}`}>
                          <i className="fas fa-eye" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination currentPage={users.info.currentPage} numberOfPages={users.info.numberOfPages} onChangePage={this.onChangePage} />
          </div>
        );
      }
    }

    return (
      <div className="user-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Lista de usuários</h1>
              <p className="lead text-muted" />

              <div className="btn-group mb-4" role="group">
                <Link to="/users/create" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" />
                  Adicionar usuário
                </Link>
              </div>

              {usersContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  getUserList: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userStore: state.userStore
});

export default connect(
  mapStateToProps,
  { getUserList }
)(UserList);
