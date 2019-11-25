import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { spsServerUrl } from 'apis/spsServer'
import DrawFilter from '../profile/DrawFilter'

export default class PublicationCard extends Component {
  renderPublicationLevel(process, publication) {
    let result = 'Edital'

    if (publication.call_id) {
      result = `${result} | Chamada`

      const filterCall = value => {
        return value.id === publication.call_id
      }
      const call = process.Calls.find(filterCall)
      if (call) {
        result = `${result} ${call.number}`

        if (publication.step_id) {
          result = `${result} | Etapa`
          const filterStep = value => {
            return value.id === publication.step_id
          }
          const step = call.Steps.find(filterStep)
          if (step) {
            result = `${result} ${step.number}`
          }
        }
      }
    }

    return result
  }

  // renderPublicationLine(process, publication) {
  //   return (
  //     <tr key={publication.id} className={publication.valid ? '' : 'text-secondary'}>
  //       <td>{moment(publication.date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}</td>
  //       <td>{this.renderPublicationLevel(process, publication)}</td>
  //       <td>{publication.PublicationType.name}</td>
  //       <td>{publication.title}</td>
  //       <td className="text-right">
  //         <Link
  //           className="text-primary"
  //           to={{
  //             pathname: `/processes/${process.id}/publications/${publication.id}`,
  //             state: { publication: publication }
  //           }}>
  //           <i className="fas fa-search-plus" />
  //         </Link>{' '}
  //         <a
  //           className={publication.valid ? '' : 'isDisabled'}
  //           onClick={publication.valid ? e => {} : e => e.preventDefault()}
  //           href={publication.valid ? `${spsServerUrl}/v1/publications/download/${publication.file}` : ''}
  //           target="_blank"
  //           rel="noopener noreferrer">
  //           <i className="fas fa-file-download" />
  //         </a>{' '}
  //         <DrawFilter permission="publication_update" course_id={process.Course.id}>
  //           <Link
  //             className="text-primary"
  //             to={{
  //               pathname: `/processes/${process.id}/publications/${publication.id}/update`,
  //               state: { publication: publication }
  //             }}>
  //             <i className="fas fa-cog" />
  //           </Link>
  //         </DrawFilter>{' '}
  //         <DrawFilter permission="publication_delete" course_id={process.Course.id}>
  //           <Link
  //             className="text-danger"
  //             to={{
  //               pathname: `/processes/${process.id}/publications/${publication.id}/delete`,
  //               state: { publication: publication }
  //             }}>
  //             <i className="fas fa-times-circle" />
  //           </Link>
  //         </DrawFilter>
  //       </td>
  //     </tr>
  //   )
  // }

  renderPublicationLine(process, publication) {
    return (
      <li>
        <div>{moment(publication.date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')}</div>
        <div>
          <a className={publication.valid ? '' : 'isDisabled'}
          onClick={publication.valid ? e => {} : e => e.preventDefault()}
          href={publication.valid ? `${spsServerUrl}/v1/publications/download/${publication.file}` : ''}
          target="_blank"
          rel="noopener noreferrer">

            <i className="fas fa-file-download" />
            {publication.title}

          </a>
        </div>
      </li>
    )
  }

  renderTable(process) {
    return (
      // <div className="table-responsive">
      //   <table className="table table-hover mt-0 mb-0">
      //     <thead>
      //       <tr>
      //         <th>Data</th>
      //         <th>Nível</th>
      //         <th>Tipo</th>
      //         <th>Título</th>
      //         <th />
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {process.Publications.map(publication => {
      //         return this.renderPublicationLine(process, publication)
      //       })}
      //     </tbody>
      //   </table>
      // </div>
      <ul>
        {process.Publications.map(publication => {
          return this.renderPublicationLine(process, publication)
        })}
      </ul>
    )
  }

  render() {
    return (
      <section id="anexos" class="quadro">
        <h4>Anexos</h4>

        <div class="btn-add">
          <DrawFilter permission="publication_create" course_id={this.props.process.Course.id}>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/processes/${this.props.process.id}/publications/create`,
                state: { selectiveProcess: this.props.process }
              }}>
              <i className="fas fa-plus-circle" /> Adicionar
            </Link>
          </DrawFilter>
        </div>

          {this.props.process.Publications.length > 0 ? (
            this.renderTable(this.props.process)
          ) : (
            <p>Sem publicações cadastradas.</p>
          )}
      </section>
    )
  }
}
