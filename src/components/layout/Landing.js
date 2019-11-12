import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class Landing extends Component {
  componentDidMount() {
    this.props.history.push('/processes')
    // if (this.props.authStore.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
  }

  render() {
    return (
      <div className="landing">
        {/* <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">SEAD Processos Seletivos</h1>
                <p className="lead"> Secretaria de Educação a Distância da Universidade Federal do Espirito Santo</p>
                <hr />
                <Link to="/processes" className="btn btn-lg btn-info mr-2">
                  Processos Seletivos
                </Link>
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Registre-se
                </Link>
                <Link to="/login" className="btn btn-lg btn-info">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

Landing.propTypes = {
  authStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  authStore: state.authStore
})

export default connect(mapStateToProps)(Landing)
