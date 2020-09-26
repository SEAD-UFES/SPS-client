/** @format */

import React from 'react'

import { checkNested } from '../../utils/objectHelpers'
import DrawFilter from '../profile/DrawFilter'

const InscriptionListOnInscriptionEvent = props => {
  const { course_id, inscriptions } = props

  const renderInscriptionList = inscriptions => {
    return (
      <div>
        {inscriptions && inscriptions.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Número</span>
              <span>Data</span>
              <span>Candidato</span>
              <span>Vaga</span>
              <span />
            </div>
            {inscriptions.map(ins => {
              return (
                <li key={ins.id}>
                  <h3>{ins.number}</h3>
                  <p>{ins.createdAt}</p>
                  <p>{checkNested(ins, 'person') ? `${ins.person.name} ${ins.person.surname}` : 'carregando...'}</p>
                  <p>
                    {checkNested(ins, 'vacancy', 'assignment', 'name') ? `${ins.vacancy.assignment.name}` : ''}
                    {checkNested(ins, 'vacancy', 'region', 'name') ? ` - ${ins.vacancy.region.name}` : ' - sem região'}
                    {checkNested(ins, 'vacancy', 'restriction', 'name')
                      ? ` - ${ins.vacancy.restriction.name}`
                      : '- sem restrição'}
                  </p>
                  <p className='text-right' />
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

  return (
    <DrawFilter permission='inscription_read' course_id={course_id ? course_id : null}>
      <section id='inscriptions' className='quadro'>
        <h4>Lista de inscritos</h4>
        {renderInscriptionList(inscriptions)}
      </section>
    </DrawFilter>
  )
}

export default InscriptionListOnInscriptionEvent
