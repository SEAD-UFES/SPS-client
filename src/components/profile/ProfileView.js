/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { getCurrentProfile } from './profileActions'
import Spinner from '../common/Spinner'
import { checkNested } from '../../utils/objectHelpers'

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  renderUser(profile, loading) {
    if (profile === null || loading) {
      return <Spinner />
    }

    return (
      <div className='card mb-4'>
        <div className='card-header'>
          <div className='row'>
            <div className='col'>
              <h4 className='mb-0'>Dados de usuário</h4>
            </div>
            <div className='col'>
              <div className='text-right'>
                <Link
                  className='text-primary'
                  to={{
                    pathname: '/profile/edit-user',
                    prevLocation: this.props.location
                  }}>
                  <i className='fas fa-cog' /> Editar
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <table className='table table-hover mt-0 mb-0'>
            <tbody>
              <tr>
                <td>
                  <strong>Login/Email:</strong>
                </td>
                <td>{profile.login}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderPerson(profile, loading) {
    if (profile === null || loading) {
      return <Spinner />
    }

    if (!profile.Person) {
      return (
        <div className='card mb-4'>
          <div className='card-header'>
            <div className='row'>
              <div className='col'>
                <h4 className='mb-0'>Dados pessoais</h4>
              </div>
              <div className='col'>
                <div className='text-right'>
                  <Link
                    className='text-primary'
                    to={{
                      pathname: '/profile/edit-person',
                      prevLocation: this.props.location
                    }}>
                    <i className='fas fa-cog' /> Editar
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <p>Usuário ainda não possui dados pessoais.</p>
          </div>
        </div>
      )
    }

    return (
      <div className='card mb-4'>
        <div className='card-header'>
          <div className='row'>
            <div className='col'>
              <h4 className='mb-0'>Dados pessoais</h4>
            </div>
            <div className='col'>
              <div className='text-right'>
                <Link
                  className='text-primary'
                  to={{
                    pathname: '/profile/edit-person',
                    prevLocation: this.props.location
                  }}>
                  <i className='fas fa-cog' /> Editar
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <table className='table table-hover mt-0 mb-0'>
            <tbody>
              <tr>
                <td>
                  <strong>Nome / Sobrenome:</strong>
                </td>
                <td>
                  {profile.Person.name} {profile.Person.surname}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Data de Nascimento:</strong>
                </td>
                <td>
                  {profile.Person.birthdate ? (
                    moment(profile.Person.birthdate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
                  ) : (
                    <span className='text-muted'>...</span>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>CPF:</strong>
                </td>
                <td>{profile.Person.cpf}</td>
              </tr>

              <tr>
                <td>
                  <strong>Nacionalidade:</strong>
                </td>
                <td>
                  {profile.Person.nationality ? profile.Person.nationality : <span className='text-muted'>...</span>}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>RG (Número / Expeditor):</strong>
                </td>
                <td>
                  {checkNested(profile, 'Person') ? (
                    `${profile.Person.rgNumber} - ${profile.Person.rgDispatcher}`
                  ) : (
                    <span className='text-muted'>...</span>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Cor:</strong>
                </td>
                <td>{profile.Person.ethnicity ? profile.Person.ethnicity : <span className='text-muted'>...</span>}</td>
              </tr>

              <tr>
                <td>
                  <strong>Sexo:</strong>
                </td>
                <td>{profile.Person.gender ? profile.Person.gender : <span className='text-muted'>...</span>}</td>
              </tr>

              <tr>
                <td>
                  <strong>Estado Civil:</strong>
                </td>
                <td>
                  {profile.Person.civilStatus ? profile.Person.civilStatus : <span className='text-muted'>...</span>}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Nome do Pai:</strong>
                </td>
                <td>
                  {profile.Person.fatherName ? profile.Person.fatherName : <span className='text-muted'>...</span>}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Nome do Mãe:</strong>
                </td>
                <td>
                  {profile.Person.motherName ? profile.Person.motherName : <span className='text-muted'>...</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    const { user } = this.props.authStore
    const { profile, loading } = this.props.profileStore

    let dashboardContent
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            {this.renderUser(profile, loading)}
            {this.renderPerson(profile, loading)}
          </div>
        )
      } else {
        //User login in but dont have a profile
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Bem-vindo{user.Person.name}</p>
            <p>Dados de perfil não localizados</p>
          </div>
        )
      }
    }
    return (
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Perfil</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  //deleteAccount: PropTypes.func.isRequired,
  authStore: PropTypes.object.isRequired,
  profileStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profileStore: state.profileStore,
  authStore: state.authStore
})

export default connect(
  mapStateToProps,
  {
    getCurrentProfile
  }
)(Profile)
