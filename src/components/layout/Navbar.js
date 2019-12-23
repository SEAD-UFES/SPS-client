import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from '../auth/authActions'
import { getCurrentProfile, clearCurrentProfile } from '../profile/profileActions'
import marca_ufes from '../../img/marca-ufes.svg'
import DrawFilter from 'components/profile/DrawFilter'

class Navbar extends Component {
  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      if (this.props.profileStore.profile === null) {
        this.props.getCurrentProfile()
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.authStore.isAuthenticated) {
      if (nextProps.profileStore.loading === false && nextProps.profileStore.profile === null) {
        this.props.getCurrentProfile()
      }
    }
  }

  onLogoutClick(e) {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated } = this.props.authStore
    const { loading, profile } = this.props.profileStore

    const guestLinks = (
      <div className="not-logged">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Cadastre-se
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Entrar
          </Link>
        </li>
      </div>
    )

    const authLinks = !(profile === null || loading) ? (
      <div className="logged">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            {profile.Person ? profile.Person.name : profile.login}
          </Link>
        </li>
        <li className="nav-item">
          <button type="button" onClick={this.onLogoutClick.bind(this)} className="btn btn-link nav-link">
            Sair
          </button>
        </li>
      </div>
    ) : (
      <span className="text-white">Carregando...</span>
    )

    return (
      <header>
        <div id="barra-ufes">
          <div className="container">
            <a
              href="http://www.ufes.br"
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir portal da Ufes em nova aba">
              <img src={marca_ufes} alt="" />
              <span>Universidade Federal do Espírito Santo</span>
            </a>

            <ul className="links-externos">
              <li>
                <a
                  href="http://www.ufes.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir portal da Ufes em nova aba">
                  <span>Portal Ufes</span>
                </a>
              </li>
              <li>
                <a
                  href="http://www.sead.ufes.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir portal da Ufes em nova aba">
                  <span>Portal Sead</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav className="navbar navbar-expand-sm">
          <div className="container">
            <Link className="navbar-brand" to="/processes">
              Sistema de Seleção
              <span>Processos Seletivos EaD</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <div>
                  <DrawFilter permission="parameter_list">
                    <li className="nav-item">
                      <Link className="nav-link" to="/parameters">
                        {' '}
                        Parâmetros
                      </Link>
                    </li>
                  </DrawFilter>
                </div>
                {isAuthenticated ? authLinks : guestLinks}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

// "logoutUser" and "auth" are required to the Register component
Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authStore: PropTypes.object.isRequired,
  profileStore: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  authStore: state.authStore, //get authStore from main reducer
  profileStore: state.profileStore
})

export default connect(mapStateToProps, { logoutUser, getCurrentProfile, clearCurrentProfile })(Navbar)
