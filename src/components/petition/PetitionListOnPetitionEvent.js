/** @format */

import React from 'react'

import { checkNested } from '../../utils/objectHelpers'
import DrawFilter from '../profile/DrawFilter'
import { Link } from 'react-router-dom'

const PetitionListOnPetitionEvent = props => {
  const { course_id, petitions } = props

  const renderPetitionList = petitions => {
    return (
      <div>
        {petitions && petitions.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Título</span>
              <span>Data</span>
              <span>Usuário</span>
              <span>Inscrição</span>
              <span>Oferta</span>
              <span />
            </div>
            {petitions.map(pet => {
              return (
                <li className='' key={pet.id}>
                  <h3>{pet.title}</h3>
                  <p>{pet.createdAt}</p>
                  <p>
                    {checkNested(pet, 'inscription', 'person')
                      ? `${pet.inscription.person.name} ${pet.inscription.person.surname}`
                      : '...'}
                  </p>
                  <p>{checkNested(pet, 'inscription') ? `${pet.inscription.number}` : '...'}</p>
                  <p>
                    {checkNested(pet, 'inscription', 'vacancy', 'assignment', 'name')
                      ? `${pet.inscription.vacancy.assignment.name}`
                      : ''}
                    {checkNested(pet, 'inscription', 'vacancy', 'region', 'name')
                      ? ` - ${pet.inscription.vacancy.region.name}`
                      : ''}
                    {checkNested(pet, 'inscription', 'vacancy', 'restriction', 'name')
                      ? ` - ${pet.inscription.vacancy.restriction.name}`
                      : ''}
                  </p>
                  <p className='text-right'>
                    <Link className='btn-icon' to={`/petition/read/${pet ? pet.id : ''}`}>
                      <i className='fas fa-eye' />
                    </Link>
                    <Link className='btn-icon' to={`/petition-reply/create?petition_id=${pet ? pet.id : ''}`}>
                      <i className='fas fa-reply' />
                    </Link>
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Não existem recursos cadastrados.</p>
        )}
      </div>
    )
  }

  return (
    <DrawFilter permission='petition_read' course_id={course_id ? course_id : null}>
      <section id='petitions' className='quadro'>
        <h4>Lista de recursos</h4>
        {renderPetitionList(petitions)}
      </section>
    </DrawFilter>
  )
}

export default PetitionListOnPetitionEvent
