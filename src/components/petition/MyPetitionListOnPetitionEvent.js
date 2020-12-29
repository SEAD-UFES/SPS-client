/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { checkNested } from '../../utils/objectHelpers'

const MyPetitionListOnPetitionEvent = props => {
  const { pEvent, authStore, location } = props
  const { petitions } = props

  const renderCreateButton = pEvent => {
    return (
      <div className='btn-right'>
        <Link className='btn btn-terciary' to={`/petition/create?petitionEvent_id=${pEvent ? pEvent.id : null}`}>
          <i className='fas fa-plus-circle' /> Novo recurso
        </Link>
      </div>
    )
  }

  const renderMyPetitionList = petitions => {
    return (
      <div>
        {petitions && petitions.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Data</span>
              <span>Inscrição</span>
              <span>Oferta</span>
              <span>Título</span>
              <span />
            </div>
            {petitions.map(pet => {
              return (
                <li key={pet.id}>
                  <h3>{pet.createdAt}</h3>
                  <p>{checkNested(pet, 'inscription', 'number') ? pet.inscription.number : ''}</p>
                  <p>
                    {checkNested(pet, 'inscription', 'vacancy', 'assignment', 'name')
                      ? `${pet.inscription.vacancy.assignment.name}`
                      : ''}
                    {checkNested(pet, 'inscription', 'vacancy', 'region', 'name')
                      ? ` - ${pet.inscription.vacancy.region.name}`
                      : ' - sem região'}
                    {checkNested(pet, 'inscription', 'vacancy', 'restriction', 'name')
                      ? ` - ${pet.inscription.vacancy.restriction.name}`
                      : '- sem restrição'}
                  </p>
                  <p>{pet ? pet.title : ''}</p>
                  <p className='text-right'>
                    <Link className='btn-icon' to={`/petition/delete/${pet.id}`}>
                      <i className='fas fa-trash' />
                    </Link>
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Você não tem recursos cadastrados.</p>
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
          <h4>Meus recursos</h4>
          {renderCreateButton(pEvent)}
          {renderMyPetitionList(petitions)}
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

export default MyPetitionListOnPetitionEvent
