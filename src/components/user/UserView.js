import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { getUser } from "../../actions/userActions";
import Spinner from "../common/Spinner";

class UserView extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUser(this.props.match.params.id);
    }
  }

  render() {
    const { user, loading } = this.props.user;

    let userContent;
    if (user === null || loading) {
      userContent = <Spinner />;
    } else {
      userContent = (
        <div>
          <p className="lead text-muted">{user.Person ? `${user.Person.name} ${user.Person.surname}` : "Sem nome"}</p>

          {/* <!-- Profile Actions --> */}
          <div className="btn-group mb-4" role="group">
            <Link to={`/users/${user.id}/edit-user`} className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Editar dados de acesso
            </Link>
            <Link to={`/users/${user.id}/edit-person`} className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Editar dados pessoais
            </Link>
          </div>

          {/* <!-- User data --> */}
          <div>
            <h4 className="mb-2">Dados de usuário</h4>

            <div className="row">
              <div className="col-md-3">
                <p>
                  <strong>Login/Email:</strong>
                </p>
              </div>
              <div className="col-md-9">
                <p>{user.login}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <p>
                  <strong>Status:</strong>
                </p>
              </div>
              <div className="col-md-9">
                <p>{user.authorized ? "Ativo" : "Desativado"}</p>
              </div>
            </div>
          </div>

          {/* <!-- Person Data --> */}
          {user.Person ? (
            <div>
              <h4 className="mb-3">Dados de pessoais</h4>

              <div className="row">
                <div className="col-md-3">
                  <p>
                    <strong>Nome / Sobrenome:</strong>
                  </p>
                </div>
                <div className="col-md-9">
                  <p>
                    {user.Person.name} {user.Person.surname}
                  </p>
                </div>
              </div>

              {user.Person.birthdate ? (
                <div className="row">
                  <div className="col-md-3">
                    <p>
                      <strong>Data de Nascimento:</strong>
                    </p>
                  </div>
                  <div className="col-md-9">
                    <p>{moment(user.Person.birthdate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</p>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="row">
                <div className="col-md-3">
                  <p>
                    <strong>CPF:</strong>
                  </p>
                </div>
                <div className="col-md-9">
                  <p>{user.Person.cpf}</p>
                </div>
              </div>

              {user.Person.nationality ? (
                <div className="row">
                  <div className="col-md-3">
                    <p>
                      <strong>Nacionalidade:</strong>
                    </p>
                  </div>
                  <div className="col-md-9">
                    <p>{user.Person.nationality}</p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {user.Person.rgNumber ? (
                <div className="row">
                  <div className="col-md-3">
                    <p>
                      <strong>RG (Número / Expeditor):</strong>
                    </p>
                  </div>
                  <div className="col-md-9">
                    <p>
                      {user.Person.rgNumber} - {user.Person.rgDispatcher}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {user.Person.ethnicity ? (
                <div className="row">
                  <div className="col-md-2">
                    <p>
                      <strong>Cor:</strong>
                    </p>
                  </div>
                  <div className="col-md-10">
                    <p>{user.Person.ethnicity}</p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {user.Person.gender ? (
                <div className="row">
                  <div className="col-md-2">
                    <p>
                      <strong>Sexo:</strong>
                    </p>
                  </div>
                  <div className="col-md-10">
                    <p>{user.Person.gender}</p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {user.Person.civilStatus ? (
                <div className="row">
                  <div className="col-md-2">
                    <p>
                      <strong>Estado Civil:</strong>
                    </p>
                  </div>
                  <div className="col-md-10">
                    <p>{user.Person.civilStatus}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/users" className="btn btn-light">
                Voltar para lista de usuários
              </Link>
              <h1 className="display-4">Perfil</h1>
              {userContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserView.propTypes = {
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(UserView);
