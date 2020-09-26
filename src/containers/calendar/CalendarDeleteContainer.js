/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { readCalendar, deleteCalendar } from '../../store/actions/calendar'
import CalendarDelete from '../../components/calendar/CalendarDelete'
import { selectCalendarById } from '../../store/selectors/calendar/calendar'
import { selectCallByCalendarId } from '../../store/selectors/call/call'
import { selectProcessByCalendarId } from '../../store/selectors/process/process'
import { checkNested } from '../../utils/objectHelpers'

const CalendarDeleteContainer = props => {
  const id = props.match.params.id
  const { calendar, call, errorStore } = props
  const { clearErrors, readCall, getProcess, readCalendar, deleteCalendar } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readCalendar(id, {
      withCalendar: true,
      callbackOk: cld => {
        readCall(cld.call_id, {
          callbackOk: call => {
            getProcess(call.selectiveProcess_id)
          }
        })
      }
    })
  }, [])

  //get errors from store (onPropsUpdate)
  useEffect(
    () => {
      const errorsOnStore = checkNested(errorStore, 'data', 'devMessage', 'errors')
        ? errorStore.data.devMessage.errors
        : null
      if (errorsOnStore) {
        const errorsOnState = { ...errors }
        setErrors({ ...errorsOnState, ...errorsOnStore })
      }
    },
    [errorStore]
  )

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    deleteCalendar(calendar.id, {
      callbackOk: () => {
        props.history.push(`/call/read/${call.id}`)
      }
    })
  }

  //allProps
  const allProps = {
    ...props,
    errors: errors,
    onSubmit: onSubmit
  }

  //render
  return <CalendarDelete {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const calendar_id = ownProps.match.params.id
  return {
    errorStore: state.errorStore,
    calendar: selectCalendarById(state, calendar_id, { withCalendar: true }),
    call: selectCallByCalendarId(state, calendar_id, {}),
    process: selectProcessByCalendarId(state, calendar_id, { withCourse: true })
  }
}

const mapActionsToProps = {
  clearErrors,
  readCall,
  getProcess,
  readCalendar,
  deleteCalendar
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CalendarDeleteContainer)
