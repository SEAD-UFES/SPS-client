/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCurrentProfile } from './profileActions'
import Spinner from '../common/Spinner'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { profile, loading } = this.props.profileStore

    const renderBreadcrumb = () => {
      return (
        <>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/dashboard' className='breadcrumb-link'>
              Área pessoal
            </Link>
          </div>
        </>
      )
    }

    const renderDashboard = () => {
      let dashboardContent
      if (profile === null || loading) {
        dashboardContent = <Spinner />
      } else {
        //Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <p className='lead text-muted'>{` Bem-vindo ${profile.Person ? profile.Person.name : profile.login}.`}</p>
              <p>
                Para acessar seu perfil e editar seus dados,{' '}
                <Link tile='Acessar perfil' to={'/profile'}>
                  clique aqui
                </Link>
                .
              </p>
            </div>
          )
        } else {
          //User login in but dont have a profile
          dashboardContent = (
            <div>
              <p className='lead text-muted'>Bem-vindo</p>
              <p>Erro estranho...</p>
              <Link title='Criar profile?' to='/create-profile' className='btn btn-lg btn-primary'>
                Criar profile?
              </Link>
            </div>
          )
        }
      }
      return dashboardContent
    }

    return (
      <div className='view-page'>
        <div className='container'>
          <div className='main'>
            {renderBreadcrumb()}
            <h1 className='display-4'>Área pessoal</h1>
            {renderDashboard()}
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  authStore: PropTypes.object.isRequired,
  profileStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  authStore: state.authStore,
  profileStore: state.profileStore
})

export default connect(
  mapStateToProps,
  {
    getCurrentProfile
  }
)(Dashboard)
