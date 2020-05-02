/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { readCallV2 } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { clearErrors } from '../../store/actions/error'
import { selectCallById, selectProcessByCallId } from '../../store/selectors/call'
import CallReadV2 from '../../components/callV2/callReadV2'

const CallReadContainerV2 = props => {
  const id = props.match.params.id
  const { call } = props
  const { readCallV2, getProcess } = props

  useEffect(() => {
    //clear errors
    clearErrors()
    //get call
    readCallV2(id, {
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

  console.log('call: ', call)

  return <CallReadV2 {...props} />
}

const mapStateToProps = (state, ownProps) => {
  const call_id = ownProps.match.params.id

  return {
    call: selectCallById(state, call_id, {
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
)(CallReadContainerV2)
