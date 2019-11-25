import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import DrawFilter from '../profile/DrawFilter'
import { getCallStatus } from './callHelpers'

export default class CallCard extends Component {
  renderTable(process) {
    return (
      // <table className="table">
      //   <thead>
      //     <tr>
      //       <th>Número</th>
      //       <th>Periodo</th>
      //       <th>Status</th>
      //       <th />
      //     </tr>
      //   </thead>
      //   <tbody>

      <ul>
        <div class="titulos">
          <span>Número</span>
          <span>Periodo</span>
          <span>Status</span>
          <span></span>
        </div>

          {process.Calls.map(call => {
            return (
              // <tr key={call.id}>
              //   <td>{call.number}</td>
              //   <td>
              //     {moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
              //     {' - '}
              //     {moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
              //   </td>
              //   <td>{getCallStatus(call)}</td>
              //   <td className="text-right">
              //     <DrawFilter permission="call_read" course_id={process.Course.id}>
              //       <Link className="text-primary" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}`}>
              //         <i className="fas fa-search-plus" />
              //       </Link>
              //     </DrawFilter>{' '}
              //     <DrawFilter permission="call_update" course_id={process.Course.id}>
              //       <Link className="text-primary" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
              //         <i className="fas fa-cog" />
              //       </Link>
              //     </DrawFilter>{' '}
              //     <DrawFilter permission="call_delete" course_id={process.Course.id}>
              //       <Link className="text-danger" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/delete`}>
              //         <i className="fas fa-times-circle" />
              //       </Link>
              //     </DrawFilter>
              //   </td>
              // </tr>

              <li key={call.id}>
                <h3><span>Chamada </span>{call.number}</h3>
                <p>
                  {moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
                  {' - '}
                  {moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}
                </p>
                <p>
                  {getCallStatus(call)}
                </p>
                <p className="text-right">
                  <DrawFilter permission="call_read" course_id={process.Course.id}>
                    <Link className="text-primary" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}`}>
                      <i className="fas fa-search-plus" />
                    </Link>
                  </DrawFilter>{' '}
                  <DrawFilter permission="call_update" course_id={process.Course.id}>
                    <Link className="text-primary" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
                      <i className="fas fa-cog" />
                    </Link>
                  </DrawFilter>{' '}
                  <DrawFilter permission="call_delete" course_id={process.Course.id}>
                    <Link className="text-danger" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/delete`}>
                      <i className="fas fa-times-circle" />
                    </Link>
                  </DrawFilter>
                </p>
              </li>

            )
          })}
          </ul>
      //   </tbody>
      // </table>
    )
  }

  render() {
    return (
      <section id="chamadas" class="quadro">
        <h4>Chamadas</h4>

        <div class="btn-add">
          <DrawFilter permission="call_create" course_id={this.props.process.Course.id}>
            <Link className="btn btn-primary" to={`/processes/${this.props.process.id}/calls/create`}>
              <i className="fas fa-plus-circle" /> Adicionar
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
