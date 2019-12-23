import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { verifyToken } from './VerificationActions'

function VerificationToken(props) {
  const token = props.match.params.token

  //operações de validação

  return (
    <div className="verification-token">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4">Token</h1>
            <p>Componente que vai processar o token {token}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

VerificationToken.proptypes = {}

const mapStateToProps = state => ({
  errorStore: state.errorStore
})

const mapFunctionsToProps = {
  verifyToken
}

export default connect(mapStateToProps, mapFunctionsToProps)(VerificationToken)
