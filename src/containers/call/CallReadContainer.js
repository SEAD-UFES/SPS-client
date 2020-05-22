/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { readCallV2 } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { clearErrors } from '../../store/actions/error'
import { selectCallById, selectProcessByCallId } from '../../store/selectors/call'
import CallRead from '../../components/callV2/CallRead'

const CallReadContainer = props => {
  const id = props.match.params.id
  const { readCallV2, getProcess, clearErrors } = props

  useEffect(() => {
    //clear errors
    clearErrors()
    //get call
    readCallV2(id, {
      withCalendar: true,
      withVacancy: true,
      withAssignment: true,
      withRegion: true,
      withRestriction: true,
      callbackOk: call => {
        //get process
        getProcess(call.selectiveProcess_id)
      }
    })
  }, [])

  return <CallRead {...props} />
}

const mapStateToProps = (state, ownProps) => {
  const call_id = ownProps.match.params.id

  return {
    call: selectCallById(state, call_id, {
      withCalendar: true,
      withVacancy: true,
      withAssignment: true,
      withRegion: true,
      withRestriction: true
    }),
    process: selectProcessByCallId(state, call_id, { withCourse: true, withGraduationType: true }),
    errorStore: state.errorStore
  }
}

const mapActionsToProps = {
  readCallV2,
  getProcess,
  clearErrors
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CallReadContainer)
