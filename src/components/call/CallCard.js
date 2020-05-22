/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import DrawFilter from '../profile/DrawFilter'
import { getCallStatus } from './callHelpers'

export default class CallCard extends Component {
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
          return (
            <li key={call.id}>
              <h3>
                <span>Chamada </span>
                {call.number}
              </h3>
              <p>
                {moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
                {' - '}
                {moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
              </p>
              <p>{getCallStatus(call)}</p>
              <p className='text-right'>
                <DrawFilter permission='call_read' course_id={process.Course.id}>
                  <Link className='btn-icon laranja' to={`/call/read/${call.id}`}>
                    <i className='fas fa-eye' />
                  </Link>
                </DrawFilter>{' '}
                {/* <DrawFilter permission="call_update" course_id={process.Course.id}>
                  <Link className="icon-edit" to={`/processes/${call.selectiveProcess_id}/call/${call.id}/edit`}>
                    <i className="fas fa-pencil-alt"></i>
                  </Link>
                </DrawFilter>{' '} */}
                <DrawFilter permission='call_delete' course_id={process.Course.id}>
                  <Link className='btn-icon' to={`/processes/${call.selectiveProcess_id}/call/${call.id}/delete`}>
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

        <div className='btn-right'>
          <DrawFilter permission='call_create' course_id={this.props.process.Course.id}>
            <Link className='btn btn-terciary' to={`/processes/${this.props.process.id}/call/create`}>
              <i className='fas fa-plus-circle' /> Adicionar
            </Link>
          </DrawFilter>
        </div>

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
