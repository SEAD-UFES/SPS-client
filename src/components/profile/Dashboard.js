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

    let dashboardContent
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>
              Bem-vindo <Link to={'/profile'}>{profile.Person ? profile.Person.name : profile.login}</Link>
            </p>
          </div>
        )
      } else {
        //User login in but dont have a profile
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Bem-vindo</p>
            <p>Erro estranho...</p>
            <Link to='/create-profile' className='btn btn-lg btn-primary'>
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className='dashboard'>
        <div className='container' id='main'>
          <h1>Dashboard</h1>
          {dashboardContent}
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
