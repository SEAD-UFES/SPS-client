/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'
import { isEmpty } from '../../utils/objectHelpers'
import Spinner from '../common/Spinner'

const CallDelete = props => {
  const { process, call, callLoading, history } = props
  const { errorStore, errors } = props
  const { onSubmit } = props

  const renderBreadcrumb = process => {
    return (
      <div className='breadcrumb'>
        <span>Você está em:</span>
        <Link to='/processes' className='breadcrumb-link'>
          Processos Seletivos
        </Link>

        <i className='fas fa-greater-than' />
        <Link to={`/processes/${process ? process.id : null}`} className='breadcrumb-link'>
          {process ? `Edital ${process.number}/${process.year}` : 'Edital'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Excluir chamada</span>
      </div>
    )
  }

  const renderInfo = (process, call, callLoading) => {
    if (call === null || callLoading) {
      return <Spinner />
    }

    return (
      <div>
        <p>
          <strong>Id: </strong>
          {call ? call.id : null}
        </p>
        <p>
          <strong>Processo: </strong>
          {`${process ? process.number : null}/${process ? process.year : null} - ${
            process ? process.Course.name : null
          }`}
        </p>
        <p>
          <strong>Número: </strong>
          {call ? call.number : null}
        </p>
        <p>
          <strong>Data de abertura: </strong>
          {call ? moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY HH:mm:ss') : null}
        </p>
        <p>
          <strong>Data de encerramento: </strong>
          {call ? moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY HH:mm:ss') : null}
        </p>
      </div>
    )
  }

  const renderChoices = (onSubmit, history) => {
    return (
      <div className='row'>
        <div className='col'>
          <input type='button' value='Excluir' className='btn btn-primary btn-block mt-4' onClick={onSubmit} />
        </div>
        <div className='col'>
          <input
            type='button'
            value='Cancelar'
            className='btn btn-secondary btn-block mt-4'
            onClick={() => {
              history.goBack()
            }}
          />
        </div>
      </div>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return <p className='text-danger'>{errors.message || errors.id}</p>
    }
  }

  return (
    <div className='call-delete'>
      <div className='container'>
        {renderBreadcrumb(process)}
        <div className='form-container' id='main'>
          <h1>Excluir chamada</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(process, call, callLoading)}
          {renderChoices(onSubmit, history)}
        </div>
      </div>
    </div>
  )
}

export default CallDelete
