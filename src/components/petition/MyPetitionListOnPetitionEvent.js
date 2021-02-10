/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { checkNested } from '../../utils/objectHelpers'

const MyPetitionListOnPetitionEvent = props => {
  const { pEvent, petitions, calendar } = props
  const eventInProgress = calendar && calendar.status === 'Em andamento' ? true : false

  const renderCreateButton = pEvent => {
    if (eventInProgress) {
      return (
        <div className='btn-right'>
          <Link className='btn btn-terciary' to={`/petition/create?petitionEvent_id=${pEvent ? pEvent.id : null}`}>
            <i className='fas fa-plus-circle' /> Novo recurso
          </Link>
        </div>
      )
    } else {
      return ''
    }
  }

  const renderMyPetitionList = petitions => {
    return (
      <div>
        {petitions && petitions.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Título</span>
              <span>Data</span>
              <span>Inscrição</span>
              <span>Oferta</span>
              <span />
            </div>
            {petitions.map(pet => {
              return (
                <li key={pet.id}>
                  <h3>{pet ? pet.title : ''}</h3>

                  <p>{moment(pet.createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>

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
                  <p className='text-right'>
                    <Link className='btn-icon' to={`/petition/read/${pet.id}`}>
                      <i className='fas fa-eye' />
                    </Link>
                    {eventInProgress ? (
                      <Link className='btn-icon' to={`/petition/delete/${pet.id}`}>
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
          <p className='mb-0'>Você não tem recursos cadastrados.</p>
        )}
      </div>
    )
  }

  return (
    <>
      <section id='myPetitions' className='quadro'>
        <h4>Meus recursos</h4>
        {renderCreateButton(pEvent)}
        {renderMyPetitionList(petitions)}
      </section>
    </>
  )
}

export default MyPetitionListOnPetitionEvent
