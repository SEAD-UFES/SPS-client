/** @format */

import React from 'react'

import { checkNested } from '../../utils/objectHelpers'
import DrawFilter from '../profile/DrawFilter'

const PetitionListOnPetitionEvent = props => {
  const { course_id, petitions } = props

  const renderPetitionList = petitions => {
    return (
      <div>
        {petitions && petitions.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Data</span>
              <span>Usuário</span>
              <span>Inscrição</span>
              <span>Oferta</span>
              <span>Título</span>
              <span />
            </div>
            {petitions.map(pet => {
              return (
                <li key={pet.id}>
                  <h3>{pet.createdAt}</h3>
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
                  <p>{pet.title}</p>
                  <p className='text-right' />
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
