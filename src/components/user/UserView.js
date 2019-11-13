import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { getUser } from './userActions'
import Spinner from '../common/Spinner'

class UserView extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUser(this.props.match.params.id)
    }
  }

  renderUser(user, loading) {
    if (user === null || loading) {
      return <Spinner />
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Dados de usuário</h4>
            </div>
            <div className="col">
              <div className="text-right">
                <Link
                  className="text-primary"
                  to={{
                    pathname: `/users/${user.id}/edit-user`,
                    prevLocation: this.props.location
                  }}>
                  <i className="fas fa-cog" /> Editar
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-hover mt-0 mb-0">
            <tbody>
              <tr>
                <td>
                  <strong>Login/Email:</strong>
                </td>
                <td>{user.login}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderPerson(user, loading) {
    if (user === null || loading) {
      return <Spinner />
    }

    if (!user.Person) {
      return (
        <div className="card mb-4">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h4 className="mb-0">Dados pessoais</h4>
              </div>
              <div className="col">
                <div className="text-right">
                  <Link
                    className="text-primary"
                    to={{
                      pathname: `/users/${user.id}/edit-person`,
                      prevLocation: this.props.location
                    }}>
                    <i className="fas fa-cog" /> Editar
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p>Usuário ainda não possui dados pessoais.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Dados pessoais</h4>
            </div>
            <div className="col">
              <div className="text-right">
                <Link
                  className="text-primary"
                  to={{
                    pathname: `/users/${user.id}/edit-person`,
                    prevLocation: this.props.location
                  }}>
                  <i className="fas fa-cog" /> Editar
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-hover mt-0 mb-0">
            <tbody>
              <tr>
                <td>
                  <strong>Nome / Sobrenome:</strong>
                </td>
                <td>
                  {user.Person.name} {user.Person.surname}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Data de Nascimento:</strong>
                </td>
                <td>
                  {user.Person.birthdate ? (
                    moment(user.Person.birthdate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
                  ) : (
                    <span className="text-muted">...</span>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>CPF:</strong>
                </td>
                <td>{user.Person.cpf}</td>
              </tr>

              <tr>
                <td>
                  <strong>Nacionalidade:</strong>
                </td>
                <td>{user.Person.nationality ? user.Person.nationality : <span className="text-muted">...</span>}</td>
              </tr>

              <tr>
                <td>
                  <strong>RG (Número / Expeditor):</strong>
                </td>
                <td>
                  {user.Person.rgNumber ? (
                    user.Person.rgNumber - user.Person.rgDispatcher
                  ) : (
                    <span className="text-muted">...</span>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Cor:</strong>
                </td>
                <td>{user.Person.ethnicity ? user.Person.ethnicity : <span className="text-muted">...</span>}</td>
              </tr>

              <tr>
                <td>
                  <strong>Sexo:</strong>
                </td>
                <td>{user.Person.gender ? user.Person.gender : <span className="text-muted">...</span>}</td>
              </tr>

              <tr>
                <td>
                  <strong>Estado Civil:</strong>
                </td>
                <td>{user.Person.civilStatus ? user.Person.civilStatus : <span className="text-muted">...</span>}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    const { user, loading } = this.props.userStore
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/users" className="btn btn-light">
                Voltar para lista de usuários
              </Link>
              <h1 className="display-4">Usuário</h1>
              {/* {userContent} */}
              {this.renderUser(user, loading)}
              {this.renderPerson(user, loading)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UserView.propTypes = {
  getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userStore: state.userStore
})

export default connect(mapStateToProps, {
  getUser
})(UserView)
