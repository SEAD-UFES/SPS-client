/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { checkNested } from '../../utils/objectHelpers'

const MyInscriptionListOnInscriptionEvent = props => {
  const { iEvent, inscriptions, calendar, authStore, location } = props
  const eventInProgress = calendar && calendar.status === 'Em andamento' ? true : false

  const renderCreateButton = iEvent => {
    if (eventInProgress) {
      return (
        <div className='btn-right'>
          <Link
            className='btn btn-terciary'
            to={`/inscription/create?inscriptionEvent_id=${iEvent ? iEvent.id : null}`}>
            <i className='fas fa-plus-circle' /> Inscrever-se
          </Link>
        </div>
      )
    } else {
      return ''
    }
  }

  const renderMyInscriptionList = inscriptions => {
    return (
      <div>
        {inscriptions && inscriptions.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Número</span>
              <span>Data</span>
              <span>Vaga</span>
              <span />
            </div>
            {inscriptions.map(ins => {
              return (
                <li key={ins.id}>
                  <h3>{ins.number}</h3>
                  <p>{ins.createdAt}</p>
                  <p>
                    {checkNested(ins, 'vacancy', 'assignment', 'name') ? `${ins.vacancy.assignment.name}` : ''}
                    {checkNested(ins, 'vacancy', 'region', 'name') ? ` - ${ins.vacancy.region.name}` : ' - sem região'}
                    {checkNested(ins, 'vacancy', 'restriction', 'name')
                      ? ` - ${ins.vacancy.restriction.name}`
                      : '- sem restrição'}
                  </p>
                  <p className='text-right'>
                    {eventInProgress ? (
                      <Link className='btn-icon' to={`/inscription/delete/${ins.id}`}>
                        <i className='fas fa-trash' />
                      </Link>
                    ) : (
                      ''
                    )}
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Você não tem inscrições cadastradas.</p>
        )}
      </div>
    )
  }

  const renderNoAuthInfo = location => {
    return (
      <>
        <div className='alert alert-warning' role='alert'>
          <h4 className='alert-heading'>Ação necessária.</h4>
          <p>É preciso estar autenticado no sistema para ver suas inscrições ou inscrever-se.</p>
          <hr />
          <p>
            Se você não possui cadastro: <Link to='/register'>Registre-se</Link>
          </p>
          <p>
            Se você possui cadastro:{' '}
            <Link
              to={{
                pathname: `/login`,
                prevLocation: location
              }}>
              Forneça seus dados de acesso
            </Link>
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      {authStore.isAuthenticated ? (
        <section id='myInscriptions' className='quadro'>
          <h4>Minhas inscrições</h4>
          {renderCreateButton(iEvent)}
          {renderMyInscriptionList(inscriptions)}
        </section>
      ) : (
        <section id='myInscriptions' className='quadro'>
          <h4>Inscrições</h4>
          {renderNoAuthInfo(location)}
        </section>
      )}
    </>
  )
}

export default MyInscriptionListOnInscriptionEvent
