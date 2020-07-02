/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import InscriptionEventRead from '../../components/inscriptionEvent/InscriptionEventRead'
import { clearErrors } from '../../store/actions/error'
import { readInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { readCalendar, readListCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { selectInscriptionEventById } from '../../store/selectors/inscriptionEvent/selectInscriptionEventById'
import { selectCalendarByInscriptionEventId } from '../../store/selectors/calendar'
import { selectCallByInscriptionEventId } from '../../store/selectors/call'
import { selectProcessByInscriptionEventId } from '../../store/selectors/process'
import {
  selectInscriptionByInscriptionEventId,
  selectMyInscriptionByInscriptionEventId
} from '../../store/selectors/inscription/inscription'

const InscriptionEventReadContainer = props => {
  const id = props.match.params.id
  const { clearErrors, readInscriptionEvent, readCalendar, readListCalendar, readCall, getProcess } = props

  useEffect(() => {
    //clear errors
    clearErrors()
    //get InscriptionEvent
    readInscriptionEvent(id, {
      withInscription: true,
      withVacancy: true,
      withPerson: true,
      withAssignment: true,
      withRegion: true,
      withRestriction: true,
      callbackOk: iEvent => {
        //get Calendar
        readCalendar(iEvent.calendar_id, {
          callbackOk: cld => {
            //get brotherCalendars
            readListCalendar({ call_ids: [cld.call_id] })
            //get Call
            readCall(cld.call_id, {
              callbackOk: call => {
                //get Process
                getProcess(call.selectiveProcess_id, {})
              }
            })
          }
        })
      }
    })
  }, [])

  const allProps = {
    ...props
  }

  return <InscriptionEventRead {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const iEvent_id = ownProps.match.params.id

  return {
    myInscriptions: selectMyInscriptionByInscriptionEventId(state, iEvent_id, {
      withVacancy: true,
      withAssignment: true,
      withRegion: true,
      withRestriction: true
    }),
    allInscriptions: selectInscriptionByInscriptionEventId(state, iEvent_id, {
      withVacancy: true,
      withPerson: true,
      withAssignment: true,
      withRegion: true,
      withRestriction: true
    }),
    inscriptionEvent: selectInscriptionEventById(state, iEvent_id, { withInscription: true }),
    calendar: selectCalendarByInscriptionEventId(state, iEvent_id, { withCalendarStatus: true }),
    call: selectCallByInscriptionEventId(state, iEvent_id, {}),
    process: selectProcessByInscriptionEventId(state, iEvent_id, {}),
    errorStore: state.errorStore
  }
}

const mapActionsToProps = {
  clearErrors,
  readInscriptionEvent,
  readCalendar,
  readListCalendar,
  readCall,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionEventReadContainer)
