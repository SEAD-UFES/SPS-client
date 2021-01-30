/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { clearErrors } from '../../store/actions/error'
import { selectCallById, selectProcessByCallId } from '../../store/selectors/call/call'
import { getCallById } from '../../store/selectorsV2/getCall'
import CallRead from '../../components/call/CallRead'

const CallReadContainer = props => {
  const id = props.match.params.id
  const { readCall, getProcess, clearErrors } = props

  useEffect(() => {
    //clear errors
    clearErrors()
    //get call
    readCall(id, {
      withCalendar: { withInscriptionEvent: true, withPetitionEvent: true },
      withVacancy: { withAssignment: true, withRegion: true, withRestriction: true },
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
    call: getCallById(state, call_id, {
      withCalendar: { withInscriptionEvent: true, withPetitionEvent: true },
      withVacancy: { withAssignment: true, withRegion: true, withRestriction: true }
    }),
    process: selectProcessByCallId(state, call_id, { withCourse: true, withGraduationType: true }),
    errorStore: state.errorStore
  }
}

const mapActionsToProps = {
  readCall,
  getProcess,
  clearErrors
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CallReadContainer)
