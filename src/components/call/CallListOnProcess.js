/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import DrawFilter from '../profile/DrawFilter'
import { getCallStatus } from '../../utils/callHelpers'

export default class CallListOnProcess extends Component {
  renderCreateButton() {
    return (
      <div className='btn-right'>
        <DrawFilter permission='call_create' course_id={this.props.process.Course.id}>
          <Link
            title='Nova chamada'
            className='btn btn-terciary'
            to={`/call/create?process_id=${this.props.process.id}`}>
            <i className='fas fa-plus-circle' /> Adicionar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  renderTable(process) {
    return (
      <ul className='table-list'>
        <div className='titulos'>
          <span>Número</span>
          <span>Periodo</span>
          <span>Status</span>
          <span />
        </div>

        {process.Calls.map(call => {
          const storeCall = process.calls ? process.calls.find(c => c.id === call.id) : null

          return (
            <li key={call.id}>
              <h3>
                <span>Chamada </span>
                <Link className='btn-icon laranja' title='Acessar chamada' to={`/call/read/${call.id}`}>
                  {call.number}
                </Link>
              </h3>
              <p>
                {moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
                {' - '}
                {moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
              </p>
              <p>{storeCall ? getCallStatus(storeCall) : getCallStatus(call)}</p>
              <p className='text-right'>
                <Link className='btn-icon laranja' title='Acessar chamada' to={`/call/read/${call.id}`}>
                  <i className='fas fa-eye' />
                </Link>
                <Link
                  className='btn-icon laranja'
                  title='Eventos de inscrição'
                  to={`/inscription-event/list?call_id=${call.id}`}>
                  <i className='fas fa-calendar-check' />
                </Link>
                <DrawFilter permission='call_delete' course_id={process.Course.id}>
                  <Link className='btn-icon' title='Excluir chamada' to={`/call/delete/${call.id}`}>
                    <i className='fas fa-trash' />
                  </Link>
                </DrawFilter>
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <section id='chamadas' className='quadro'>
        <h4>Chamadas</h4>
        {this.renderCreateButton()}
        <div>
          {this.props.process.Calls.length > 0 ? (
            this.renderTable(this.props.process)
          ) : (
            <p>Sem chamadas cadastradas.</p>
          )}
        </div>
      </section>
    )
  }
}
