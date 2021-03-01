/** @format */

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
      <section className='quadro'>
        <h4>Dados de usuário</h4>
        <div className='btn-right'>
          <Link
            className='btn-terciary'
            title='Atualizar dados de usuário'
            to={{
              pathname: `/users/${user.id}/edit-user`,
              prevLocation: this.props.location
            }}>
            <i className='fas fa-pencil-alt' /> Editar
          </Link>
        </div>
        <div>
          <p>
            <strong>Login/Email: </strong>
            {user.login}
          </p>
        </div>
      </section>
    )
  }

  renderPerson(user, loading) {
    if (user === null || loading) {
      return <Spinner />
    }

    if (!user.Person) {
      return (
        <section className='quadro'>
          <h4>Dados pessoais</h4>
          <div className='btn-right'>
            <Link
              className='btn-terciary'
              title='Atualizar dados pessoais'
              to={{
                pathname: `/users/${user.id}/edit-person`,
                prevLocation: this.props.location
              }}>
              <i className='fas fa-pencil-alt' /> Editar
            </Link>
          </div>

          <div>
            <p>Usuário ainda não possui dados pessoais.</p>
          </div>
        </section>
      )
    }

    return (
      <section className='quadro'>
        <h4>Dados pessoais</h4>
        <div className='btn-right'>
          <Link
            className='btn-terciary'
            title='Atualizar dados pessoais'
            to={{
              pathname: `/users/${user.id}/edit-person`,
              prevLocation: this.props.location
            }}>
            <i className='fas fa-pencil-alt' /> Editar
          </Link>
        </div>

        <div>
          <p>
            <strong>Nome / Sobrenome: </strong>
            {user.Person.name} {user.Person.surname}
          </p>
          <p>
            <strong>Data de Nascimento: </strong>
            {user.Person.birthdate ? (
              moment(user.Person.birthdate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
            ) : (
              <span className='text-muted'>...</span>
            )}
          </p>
          <p>
            <strong>CPF: </strong>
            {user.Person.cpf}
          </p>
          <p>
            <strong>Nacionalidade: </strong>
            {user.Person.nationality ? user.Person.nationality : <span className='text-muted'>...</span>}
          </p>
          <p>
            <strong>RG (Número / Expeditor): </strong>
            {user.Person.rgNumber ? (
              user.Person.rgNumber - user.Person.rgDispatcher
            ) : (
              <span className='text-muted'>...</span>
            )}
          </p>
          <p>
            <strong>Cor: </strong>
            {user.Person.ethnicity ? user.Person.ethnicity : <span className='text-muted'>...</span>}
          </p>
          <p>
            <strong>Sexo: </strong>
            {user.Person.gender ? user.Person.gender : <span className='text-muted'>...</span>}
          </p>
          <p>
            <strong>Estado Civil: </strong>
            {user.Person.civilStatus ? user.Person.civilStatus : <span className='text-muted'>...</span>}
          </p>
        </div>
      </section>
    )
  }

  render() {
    const { user, loading } = this.props.userStore
    return (
      <div className='profile view-page'>
        <div className='container'>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/parameters' className='breadcrumb-link'>
              Parâmetros
            </Link>
            <i className='fas fa-greater-than' />
            <Link to='/users' className='breadcrumb-link'>
              Usuários
            </Link>
            <i className='fas fa-greater-than' />
            <span>Usuário X</span>
          </div>

          <div id='main'>
            <h1>Usuário X</h1>
            {/* {userContent} */}
            {this.renderUser(user, loading)}
            {this.renderPerson(user, loading)}
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

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(UserView)
