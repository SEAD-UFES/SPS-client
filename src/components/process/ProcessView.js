/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getProcess } from './processActions'
import Spinner from '../common/Spinner'
import DrawFilter from '../profile/DrawFilter'
import CallListOnProcess from '../call/CallListOnProcess'
import PublicationCard from 'components/publication/PublicationCard'

class ProcessView extends Component {
  componentDidMount() {
    this.props.getProcess(this.props.match.params.id)
  }

  renderProcessName(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }

    return <React.Fragment>{`Edital ${process.number}/${process.year}`}</React.Fragment>
  }

  renderProcessEdit(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }

    return (
      <div className='btn-right'>
        <DrawFilter permission='selectiveprocess_update' course_id={process.Course.id}>
          <Link className='btn btn-primary' to={`/processes/${process.id}/edit`}>
            <i className='fas fa-cog' /> Editar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  renderInfoTable(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }

    return (
      <section id='info'>
        <div>
          <p>{process.description}</p>
        </div>

        <div>
          <p>
            <strong>Nível: </strong>
            {process.Course.GraduationType.name}
          </p>

          <p>
            <strong>Curso: </strong>
            {process.Course.name}
          </p>

          <DrawFilter permission='selectiveprocess_create' course_id={process.Course.id}>
            <p>
              <strong>Visibilidade: </strong>
              {process.visible ? 'Processo visível' : 'Processo oculto'}
            </p>
          </DrawFilter>

          <p>
            <strong>Atribuições: </strong>
            {process.Assignments.length > 0
              ? process.Assignments.map((assignment, key) => {
                  if (key === 0) {
                    return assignment.name
                  } else {
                    return `, ${assignment.name}`
                  }
                })
              : 'Atribuições não definidas'}
          </p>
        </div>
      </section>
    )
  }

  renderCalls(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }
    return <CallListOnProcess process={process} course_id={process.id} />
  }

  renderPublications(process, loading) {
    if (process === null || loading) {
      return <Spinner />
    }
    return <PublicationCard process={process} course_id={process.id} />
  }

  render() {
    const { process, loading } = this.props.processStore
    const processStore = this.props.processStore

    return (
      <div className='process-view'>
        <div className='container'>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/processes' className='breadcrumb-link'>
              Processos Seletivos
            </Link>
            <i className='fas fa-greater-than' />
            <span>{this.renderProcessName(process, loading)}</span>
          </div>

          <div id='main'>
            <h1>{this.renderProcessName(process, loading)}</h1>
            {this.renderProcessEdit(process, loading)}
            {this.renderInfoTable(process, loading)}
            {this.renderPublications(processStore.process, processStore.loading)}
            {this.renderCalls(processStore.process, processStore.loading)}
          </div>
        </div>
      </div>
    )
  }
}

ProcessView.propTypes = {
  getProcess: PropTypes.func.isRequired,
  processStore: PropTypes.object.isRequired,
  authStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  processStore: state.processStore,
  authStore: state.authStore
})

export default connect(
  mapStateToProps,
  {
    getProcess
  }
)(ProcessView)
