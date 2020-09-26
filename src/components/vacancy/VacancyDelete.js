/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import { checkNested, isEmpty } from '../../utils/objectHelpers'

const VacancyDelete = props => {
  const { process, call, vacancy, history } = props
  const { errorStore, errors } = props
  const { onSubmit } = props

  const renderBreadcrumb = (process, call) => {
    return (
      <div className='breadcrumb'>
        <span>Você está em:</span>
        <Link to='/processes' className='breadcrumb-link'>
          Processos Seletivos
        </Link>

        <i className='fas fa-greater-than' />
        <Link to={`/processes/read/${process ? process.id : null}`} className='breadcrumb-link'>
          {process ? `Edital ${process.number}/${process.year}` : 'Edital'}
        </Link>

        <i className='fas fa-greater-than' />
        <Link to={`/call/read/${call ? call.id : null}`} className='breadcrumb-link'>
          {call ? `Chamada ${call.number}` : 'Chamada'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Excluir oferta de vaga</span>
      </div>
    )
  }

  const renderInfo = (process, call, vacancy) => {
    return (
      <div>
        <p>
          <strong>Id: </strong>
          {vacancy ? vacancy.id : null}
        </p>
        <p>
          <strong>Processo: </strong>
          {`${process ? process.number : null}/${process ? process.year : null} - ${
            process ? process.Course.name : null
          } | Chamada ${call ? call.number : null}`}
        </p>

        <p>
          <strong>Atribuição: </strong>
          {checkNested(vacancy, 'assignment', 'name') ? vacancy.assignment.name : null}
        </p>

        <p>
          <strong>Região: </strong>
          {checkNested(vacancy, 'region', 'name') ? vacancy.region.name : 'Sem região'}
        </p>

        <p>
          <strong>Restrição: </strong>
          {checkNested(vacancy, 'restriction', 'name') ? vacancy.restriction.name : 'Sem restrição'}
        </p>

        <p>
          <strong>Vagas: </strong>
          {vacancy ? vacancy.qtd : null}
        </p>

        <p>
          <strong>Reserva: </strong>
          {vacancy ? (vacancy.reserve ? 'Sim' : 'Não') : null}
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
    <div className='vacancy-delete'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Excluir oferta de vaga</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(process, call, vacancy)}
          {renderChoices(onSubmit, history)}
        </div>
      </div>
    </div>
  )
}

export default VacancyDelete
