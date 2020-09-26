/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from 'moment'
import Spinner from 'components/common/Spinner'

import { getStep, deleteStep } from 'components/step/stepActions'

class StepDelete extends Component {
  constructor() {
    super()
    this.state = { errors: [] }

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.step_id) {
      this.props.getStep(this.props.match.params.step_id)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //error handling
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.deleteStep(this.props.match.params.step_id, () => {
      this.props.history.push(`/processes/read/${this.props.match.params.process_id}`)
    })
  }

  render() {
    const { step, loading } = this.props
    const { errors } = this.state

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div className='alert alert-danger' role='alert'>
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ''
        )}
        {errors.anotherError ? (
          <div className='alert alert-danger' role='alert'>
            <strong>Erro!</strong> Erro desconhecido
          </div>
        ) : (
          ''
        )}
      </div>
    )

    const infoTable =
      step === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className='mb-2'>Informações</h4>
          <table className='table'>
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{step.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Número:</strong>
                </td>
                <td>{step.number}</td>
              </tr>
              <tr>
                <td>
                  <strong>Tipo:</strong>
                </td>
                <td>{step.stepType_id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Resultado:</strong>
                </td>
                <td>{moment(step.resultDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Periodo de recursos:</strong>
                </td>
                <td>
                  {moment(step.openAppealDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
                  {' - '}
                  {moment(step.limitAppealDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Resultado pós-recurso:</strong>
                </td>
                <td>{moment(step.resultAfterAppealDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )

    const choices = (
      <div className='row'>
        <div className='col'>
          <input type='button' value='Excluir' className='btn btn-primary btn-block mt-4' onClick={this.onSubmit} />
        </div>
        <div className='col'>
          <input
            type='button'
            value='Cancelar'
            className='btn btn-secondary btn-block mt-4'
            onClick={() => {
              this.props.history.goBack()
            }}
          />
        </div>
      </div>
    )

    return (
      <div className='roleassignments'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to={`/processes/read/${this.props.match.params.process_id}`} className='btn btn-light'>
                Voltar para o processo
              </Link>
              <h1 className='display-4 mb-4 text-center'>Excluir etapa</h1>
              {alertsList}
              <p className='lead text-center'>Você solicitou excluir o item:</p>
              {infoTable}
              <p className='lead text-center'>Confirma a operação?</p>
              {choices}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

StepDelete.propTypes = {
  getStep: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  step: state.stepStore.step,
  loading: state.stepStore.loading,
  errors: state.errorStore
})

export default connect(
  mapStateToProps,
  {
    getStep,
    deleteStep
  }
)(StepDelete)
