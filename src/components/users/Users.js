import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList } from "../../actions/userActions";
import Spinner from "../common/Spinner";

class Users extends Component {
  componentDidMount() {
    this.props.getUserList();
  }

  //componentWillReceiveProps(nextProps) {}

  render() {
    const { users, loading } = this.props.user;
    //const { users, loading } = { users: [], loading: false };
    let usersContent;

    if (users === null || loading) {
      usersContent = <Spinner />;
    } else {
      if (users.length > 0) {
        usersContent = (
          <div>
            <h4 className="mb-2">Usuários</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome/Sobrenome</th>
                  <th>Login/Email</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>
                        {user.Person.name} {user.Person.surname}
                      </td>

                      <td>{user.login}</td>

                      <td>{user.authorized ? "Ativo" : "Desativado"}</td>

                      <td>
                        <Link className="text-success" to={`/users/${user.id}`}>
                          <i className="fas fa-info-circle" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
                <Link to="/users/add" className="btn btn-light">
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

Users.propTypes = {
  getUserList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserList }
)(Users);
