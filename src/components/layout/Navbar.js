import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from '../auth/authActions'
import { getCurrentProfile, clearCurrentProfile } from '../profile/profileActions'
import avatar from '../../img/none.png'
import DrawFilter from 'components/profile/DrawFilter'

class Navbar extends Component {
  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      if (this.props.profileStore.profile === null) {
        this.props.getCurrentProfile()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
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
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Registre-se
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    )

    const authLinks = !(profile === null || loading) ? (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            {profile.Person ? profile.Person.name : profile.login}
          </Link>
        </li>
        <li className="nav-item">
          <button type="button" onClick={this.onLogoutClick.bind(this)} className="btn btn-link nav-link">
            <img
              className="rounded-circle"
              src={avatar}
              alt={profile.Person ? profile.Person.name : profile.login}
              style={{ width: '25px', marginRight: '5px' }}
              title={profile.Person ? profile.Person.name : profile.login}
            />{' '}
            Logout
          </button>
        </li>
      </ul>
    ) : (
      <span className="text-white">Carregando...</span>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-info mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            SEAD SPS
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <DrawFilter permission="user_list">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    {' '}
                    Usuários
                  </Link>
                </li>
              </DrawFilter>

              <li className="nav-item">
                <Link className="nav-link" to="/processes">
                  {' '}
                  Processos
                </Link>
              </li>

              <DrawFilter permission="parameter_list">
                <li className="nav-item">
                  <Link className="nav-link" to="/parameters">
                    {' '}
                    Parâmetros
                  </Link>
                </li>
              </DrawFilter>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
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

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentProfile, clearCurrentProfile }
)(Navbar)
