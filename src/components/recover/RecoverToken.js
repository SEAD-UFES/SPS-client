import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup'
import { getRecover, changeRecover } from './recoverActions'
import { validateToken, validatePasswordCheck, validatePasswordForm } from './validateRecover'

function RecoverToken(props) {
  const [valid, setValid] = useState(false)
  const [token, setToken] = useState('')
  const [data, setData] = useState({ password: '', passwordCheck: '' })
  const [updated, setUpdated] = useState(false)
  const [errors, setErrors] = useState({})

  //get errors from reducer
  useEffect(() => {
    if (props.errorStore && props.errorStore.data) {
      const newErrors = props.errorStore.data.devMessage
      setErrors(newErrors)
    }
  }, [props.errorStore])

  //token check (didmount)
  useEffect(() => {
    if (props.match.params.token) {
      props.getRecover(props.match.params.token, response => {
        setValid(true)
        setToken(props.match.params.token)
      })
    }
  }, [])

  //change token
  const onChangeToken = event => {
    event.preventDefault()
    let valResult = { error: '', isValid: true }
    let TemporaryErrors = errors

    valResult = validateToken(event.target.value)

    if (!valResult.isValid) {
      TemporaryErrors = { ...TemporaryErrors, [event.target.name]: valResult.error }
    } else {
      delete TemporaryErrors[event.target.name]
    }

    setToken(event.target.value)
    setErrors(TemporaryErrors)
  }

  //submit token
  const onSubmitToken = event => {
    event.preventDefault()
    const valToken = validateToken(token)

    if (!valToken.isValid) {
      setErrors({ token: valToken.error })
    } else {
      props.getRecover(token, result => {
        setValid(true)
      })
    }
  }

  const onChangePassword = event => {
    event.preventDefault()
    let valPass1 = { error: '', isValid: true }
    let valPass2 = { error: '', isValid: true }
    let TemporaryErrors = errors

    switch (event.target.name) {
      case 'password':
        valPass1 = validatePasswordCheck(event.target.value, data.passwordCheck)
        valPass2 = validatePasswordCheck(data.passwordCheck, event.target.value)
        break
      case 'passwordCheck':
        valPass1 = validatePasswordCheck(data.password, event.target.value)
        valPass2 = validatePasswordCheck(event.target.value, data.password)
        break
      default:
        break
    }

    if (!valPass1.isValid) {
      TemporaryErrors = { ...TemporaryErrors, password: valPass1.error }
    } else {
      delete TemporaryErrors['password']
    }

    if (!valPass2.isValid) {
      TemporaryErrors = { ...TemporaryErrors, passwordCheck: valPass2.error }
    } else {
      delete TemporaryErrors['passwordCheck']
    }

    setData({ ...data, [event.target.name]: event.target.value })
    setErrors(TemporaryErrors)
  }

  const onSubmitPassword = event => {
    event.preventDefault()

    const valForm = validatePasswordForm(data)

    if (!valForm.isValid) {
      setErrors(valForm.errors)
    } else {
      props.changeRecover(token, data.password, () => {
        setUpdated(true)
      })
    }
  }

  const renderSetToken = () => {
    return (
      <React.Fragment>
        <h1>Insira o código de recuperação</h1>
        <div className="form-container">
          <form onSubmit={onSubmitToken}>
            <TextFieldGroup
              type="text"
              name="token"
              label="Código de recuperação"
              value={token}
              onChange={onChangeToken}
              error={errors.token || errors.message}
            />
            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      </React.Fragment>
    )
  }

  const renderSetPassword = () => {
    return (
      <React.Fragment>
        <h1>Altere sua senha</h1>
        <div className="form-container">
          <form onSubmit={onSubmitPassword}>
            <TextFieldGroup
              type="password"
              name="password"
              label="Digite sua nova senha"
              value={data.password}
              onChange={onChangePassword}
              error={errors.password}
            />
            <TextFieldGroup
              type="password"
              name="passwordCheck"
              label="Repita sua nova senha"
              value={data.passwordCheck}
              onChange={onChangePassword}
              error={errors.passwordCheck}
            />
            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      </React.Fragment>
    )
  }

  const renderSuccess = () => {
    return (
      <React.Fragment>
        <h1>Senha alterada com sucesso</h1>
        <p>Acesse a pagina de login para entrar no sistema.</p>
        <input
          value="Ir para a página de login"
          type="button"
          className="btn btn-primary"
          onClick={() => {
            props.history.push('/login')
          }}
        />
      </React.Fragment>
    )
  }

  return (
    <div className="recover-request">
      <div className="container">
        <div id="main">{!valid ? renderSetToken() : !updated ? renderSetPassword() : renderSuccess()}</div>
      </div>
    </div>
  )
}

RecoverToken.proptypes = {}

const mapStateToProps = state => ({
  errorStore: state.errorStore
})

const mapFunctionsToProps = { getRecover, changeRecover }

export default connect(mapStateToProps, mapFunctionsToProps)(RecoverToken)
