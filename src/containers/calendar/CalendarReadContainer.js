/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { readCalendar, readListCalendar } from '../../store/actions/calendar'

import CalendarRead from '../../components/calendar/CalendarRead'

import { selectCalendarById, selectBrotherCalendarById } from '../../store/selectors/calendar/calendar'
import { selectCallByCalendarId } from '../../store/selectors/call/call'
import { selectProcessByCalendarId } from '../../store/selectors/process/process'
import { selectGroupLoading } from '../../store/selectors/loading/groupLoading'

const CalendarReadContainer = props => {
  const id = props.match.params.id
  const { clearErrors, readCalendar, readListCalendar, readCall, getProcess } = props

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readCalendar(id, {
      withInscriptionEvent: true,
      callbackOk: cld => {
        readListCalendar({ call_ids: [cld.call_id] })
        readCall(cld.call_id, {
          callbackOk: call => {
            getProcess(call.selectiveProcess_id)
          }
        })
      }
    })
  }, [])

  const allProps = {
    ...props
  }

  return <CalendarRead {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const calendar_id = ownProps.match.params.id
  return {
    errorStore: state.errorStore,
    calendars: selectBrotherCalendarById(state, calendar_id, {}),
    calendar: selectCalendarById(state, calendar_id, { withCalendarStatus: true, withInscriptionEvent: true }),
    calendarLoading: state.calendarStore.loading,
    call: selectCallByCalendarId(state, calendar_id, {}),
    process: selectProcessByCalendarId(state, calendar_id, { withCourse: true }),
    calendarGroupLoading: selectGroupLoading(state, { withCalendar: true, withInscriptionEvent: true })
  }
}

const mapActionsToProps = {
  clearErrors,
  readCalendar,
  readListCalendar,
  readCall,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CalendarReadContainer)
