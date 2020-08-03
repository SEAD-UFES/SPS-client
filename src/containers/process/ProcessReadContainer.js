/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import ProcessRead from '../../components/process/ProcessRead'
import { clearErrors } from '../../store/actions/error'
import { getProcess } from '../../store/actions/process'
import { selectProcessById } from '../../store/selectors/process/process'

const ProcessReadContainer = props => {
  const id = props.match.params.id
  const { clearErrors, getProcess } = props

  //componentDidMount
  useEffect(() => {
    clearErrors()
    getProcess(id, {
      withCall: true,
      withCalendar: true,
      withInscriptionEvent: true
    })
  }, [])

  const allProps = {
    ...props
  }

  return <ProcessRead {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const process_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    process: selectProcessById(state, process_id, {
      withCall: true,
      withCalendar: true,
      withCalendarStatus: true,
      withInscriptionEvent: true
    }),
    loading: null
  }
}

const mapActionsToProps = {
  clearErrors,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProcessReadContainer)
