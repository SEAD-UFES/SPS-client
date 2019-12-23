import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup'
import { validateEmailRequired } from 'validation/validateEmail'
import { requireRecover } from './recoverActions'

function RecoverRequest(props) {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [requested, setRequested] = useState({ sended: false, message: '' })

  //get errors from reducer
  useEffect(() => {
    if (props.errorStore && props.errorStore.data) {
      const newErrors = props.errorStore.data.devMessage
      setErrors(newErrors)
    }
  }, [props.errorStore])

  //onChange function
  const onChange = event => {
    event.preventDefault()
    let valResult = { error: '', isValid: true }
    let TemporaryErrors = errors

    valResult = validateEmailRequired(event.target.value)

    if (!valResult.isValid) {
      TemporaryErrors = { ...TemporaryErrors, [event.target.name]: valResult.error }
    } else {
      delete TemporaryErrors[event.target.name]
    }

    setEmail(event.target.value)
    setErrors(TemporaryErrors)
  }

  //submit function
  const onSubmit = event => {
    event.preventDefault()
    const emailData = { login: email }
    let valEmail = validateEmailRequired(email)

    if (!valEmail.isValid) {
      setErrors({ email: valEmail.error })
    } else {
      props.requireRecover(emailData, response => {
        setRequested(response)
      })
    }
  }

  const renderRequest = () => {
    return (
      <React.Fragment>
        <h1>Recuperação de senha</h1>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <TextFieldGroup
              type="text"
              name="email"
              label="E-mail"
              value={email}
              onChange={onChange}
              error={errors.email || errors.login || errors.message}
            />
            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      </React.Fragment>
    )
  }

  const renderSuccess = message => {
    return (
      <React.Fragment>
        <h1>Email de recuperação enviado</h1>
        <p>{message}</p>
        <p>Acesse sua conta de email para acessar o formulário de alteração de senha por um link seguro.</p>
      </React.Fragment>
    )
  }

  return (
    <div className="recover-request">
      <div className="container">
        <div id="main">{requested.sended ? renderSuccess(requested.message) : renderRequest()}</div>
      </div>
    </div>
  )
}

RecoverRequest.proptypes = {}

const mapStateToProps = state => ({
  errorStore: state.errorStore
})

const mapFunctionsToProps = { requireRecover }

export default connect(mapStateToProps, mapFunctionsToProps)(RecoverRequest)
