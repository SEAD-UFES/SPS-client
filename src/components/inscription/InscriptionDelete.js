/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import { isEmpty, checkNested } from '../../utils/objectHelpers'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import moment from 'moment'

const InscriptionDelete = props => {
  const { process, call, calendar, inscriptionEvent, inscription } = props
  const { deleteData, errors, errorStore, history } = props
  const { onSubmit, onChange } = props

  console.log('inscription', inscription)

  const renderBreadcrumb = (process, call, inscriptionEvent) => {
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
        <Link to={`/call/read/${call ? call.id : null}`} className='breadcrumb-link'>
          {call ? `Chamada ${call.number}` : 'Chamada'}
        </Link>

        <i className='fas fa-greater-than' />
        <Link
          to={`/inscription-event/read/${inscriptionEvent ? inscriptionEvent.id : null}`}
          className='breadcrumb-link'>
          {'Evento de inscrição'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Excluir inscrição</span>
      </div>
    )
  }

  const renderInfo = (process, call, calendar, inscription) => {
    return (
      <div>
        <p>
          <strong>Id: </strong>
          {inscription ? inscription.id : null}
        </p>
        <p>
          <strong>Processo: </strong>
          {`${process ? process.number : null}/${process ? process.year : null} - ${
            process ? process.Course.name : null
          } | Chamada ${call ? call.number : null}`}
        </p>

        <p>
          <strong>Calendário: </strong>
          {checkNested(calendar, 'name') ? calendar.name : null}
        </p>

        <p>
          <strong>Data de inscrição: </strong>
          {inscription ? moment(inscription.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : null}
        </p>

        <p>
          <strong>Candidato: </strong>
          {checkNested(inscription, 'person', 'name')
            ? `${inscription.person.name} ${inscription.person.surname}`
            : null}
        </p>

        <p>
          <strong>Vaga: </strong>
          {checkNested(inscription, 'vacancy', 'assignment', 'name') ? inscription.vacancy.assignment.name : null}
          {' - '}
          {checkNested(inscription, 'vacancy', 'region', 'name') ? inscription.vacancy.region.name : 'Sem região'}
          {' - '}
          {checkNested(inscription, 'vacancy', 'restriction', 'name')
            ? inscription.vacancy.restriction.name
            : 'Sem restrição'}
        </p>
      </div>
    )
  }

  const renderChoices = (onSubmit, history) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <TextAreaFieldGroup
          name='description'
          label='Diga porque está excluindo esta inscrição...'
          value={deleteData.description}
          onChange={onChange}
          error={errors.description}
        />

        <div className='row'>
          <div className='col'>
            <input type='submit' value='Excluir' className='btn btn-primary btn-block mt-4' />
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
      </form>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.id ? <p className='text-danger'>{errors.id}</p> : null}
        </>
      )
    }
  }

  return (
    <div className='inscriptionEvent-delete'>
      <div className='container'>
        {renderBreadcrumb(process, call, inscriptionEvent)}
        <div className='form-container' id='main'>
          <h1>Excluir inscrição</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(process, call, calendar, inscription)}
          {renderChoices(onSubmit, history)}
        </div>
      </div>
    </div>
  )
}

export default InscriptionDelete
