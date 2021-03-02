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

    const renderUpdateUserButton = () => {
      return (
        <div className='btn-right'>
          <Link
            className='btn btn-terciary'
            title='Atualizar dados de usuário'
            to={{ pathname: `/profile/update-user`, prevLocation: this.props.location }}>
            <i className='fas fa-plus-circle' /> Atualizar
          </Link>
        </div>
      )
    }

    const renderUserData = () => {
      return (
        <>
          <dl className='row dl-data'>
            <dt className='col-sm-3'>Login / Email:</dt>
            <dd className='col-sm-9'>{profile.login}</dd>
          </dl>
        </>
      )
    }

    return (
      <>
        <section className='quadro'>
          <h4>Dados de usuário</h4>
          {renderUpdateUserButton()}
          {renderUserData()}
        </section>
      </>
    )
  }

  renderPerson(profile, loading) {
    //if loading return spinner
    if (profile === null || loading) return <Spinner />

    const renderUpdatePersonButton = () => {
      return (
        <div className='btn-right'>
          <Link
            className='btn btn-terciary'
            title='Atualizar dados pessoais'
            to={{ pathname: `/profile/edit-person`, prevLocation: this.props.location }}>
            <i className='fas fa-plus-circle' /> Atualizar
          </Link>
        </div>
      )
    }

    const renderPersonData = () => {
      return (
        <>
          <dl className='row dl-data'>
            <dt className='col-sm-3'>Nome / Sobrenome:</dt>
            <dd className='col-sm-9'>
              {profile.Person.name} {profile.Person.surname}
            </dd>

            <dt className='col-sm-3'>Data de Nascimento:</dt>
            <dd className='col-sm-9'>
              {' '}
              {profile.Person.birthdate ? (
                moment(profile.Person.birthdate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
              ) : (
                <span className='text-muted'>...</span>
              )}
            </dd>

            <dt className='col-sm-3'>CPF:</dt>
            <dd className='col-sm-9'>{profile.Person.cpf}</dd>

            <dt className='col-sm-3'>Nascionalidade:</dt>
            <dd className='col-sm-9'>
              {profile.Person.nationality ? profile.Person.nationality : <span className='text-muted'>...</span>}
            </dd>

            <dt className='col-sm-3'>RG (Número / Expeditor):</dt>
            <dd className='col-sm-9'>
              {checkNested(profile, 'Person') ? (
                `${profile.Person.rgNumber} - ${profile.Person.rgDispatcher}`
              ) : (
                <span className='text-muted'>...</span>
              )}
            </dd>

            <dt className='col-sm-3'>Cor:</dt>
            <dd className='col-sm-9'>
              {profile.Person.ethnicity ? profile.Person.ethnicity : <span className='text-muted'>...</span>}
            </dd>

            <dt className='col-sm-3'>Sexo:</dt>
            <dd className='col-sm-9'>
              {profile.Person.gender ? profile.Person.gender : <span className='text-muted'>...</span>}
            </dd>

            <dt className='col-sm-3'>Estado civil:</dt>
            <dd className='col-sm-9'>
              {profile.Person.civilStatus ? profile.Person.civilStatus : <span className='text-muted'>...</span>}
            </dd>

            <dt className='col-sm-3'>Nome do pai:</dt>
            <dd className='col-sm-9'>
              {profile.Person.fatherName ? profile.Person.fatherName : <span className='text-muted'>...</span>}
            </dd>

            <dt className='col-sm-3'>Nome da mãe:</dt>
            <dd className='col-sm-9'>
              {profile.Person.motherName ? profile.Person.motherName : <span className='text-muted'>...</span>}
            </dd>
          </dl>
        </>
      )
    }

    return (
      <>
        <section className='quadro'>
          <h4>Dados de pessoais</h4>
          {renderUpdatePersonButton()}
          {profile.Person ? <>{renderPersonData()}</> : <p>Usuário ainda não possui dados pessoais.</p>}
        </section>
      </>
    )
  }

  renderProfile = () => {
    const { user } = this.props.authStore
    const { profile, loading } = this.props.profileStore

    let profileContent = <></>
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <div>
            {this.renderUser(profile, loading)}
            {this.renderPerson(profile, loading)}
          </div>
        )
      } else {
        //User login in but dont have a profile
        profileContent = (
          <div>
            <p className='lead text-muted'>Bem-vindo{user.Person.name}</p>
            <p>Dados de perfil não localizados</p>
          </div>
        )
      }
    }

    return profileContent
  }

  render() {
    const renderBreadcrumb = () => {
      return (
        <>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/dashboard' className='breadcrumb-link'>
              Área pessoal
            </Link>

            <i className='fas fa-greater-than' />
            <Link to={`/profile`} className='breadcrumb-link'>
              Perfil
            </Link>
          </div>
        </>
      )
    }

    return (
      <div className='view-page'>
        <div className='container'>
          <div className='main'>
            {renderBreadcrumb()}
            <h1 className='display-4'>Perfil</h1>
            {this.renderProfile()}
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
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
