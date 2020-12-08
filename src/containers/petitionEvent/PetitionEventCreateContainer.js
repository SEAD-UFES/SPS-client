/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'

import PetitionEventCreate from '../../components/petitionEvent/PetitionEventCreate'
import { clearErrors } from '../../store/actions/error'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { selectCalendarById } from '../../store/selectors/calendar/calendar'
import { selectCallByCalendarId } from '../../store/selectors/call/call'
import { selectProcessByCalendarId } from '../../store/selectors/process/process'
import { checkNested } from '../../utils/objectHelpers'

const PetitionEventCreateContainer = props => {
  const query = qs.parse(props.location.search)
  const calendar_id = query.calendar_id || null
  const { clearErrors, readCalendar, readCall, getProcess } = props
  const { call, errorStore, history } = props

  //set states and consts
  const initialCreateData = {
    calendar_id: calendar_id,
    inscriptionEvent_id: ''
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  const calendars = call ? call.calendars : []
  const reduceCalendars = (acc, cur) => {
    if (cur.inscriptionEvents.length > 0) acc.push(cur)
    return acc
  }
  const calendarsWithInscriptionEvent = calendars.reduce(reduceCalendars, [])
  console.log(calendarsWithInscriptionEvent)

  const inscriptionEventOptions = [{ id: '', label: 'Escolha o evento de inscrição associado' }]

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readCalendar(calendar_id, {
      callbackOk: cld => {
        readCall(cld.call_id, {
          withCalendar: true,
          withInscriptionEvent: true,
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

  //onChange
  const onChange = e => {}

  //onSubmit
  const onSubmit = e => {}

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    createData: createData,
    inscriptionEventOptions: inscriptionEventOptions,
    errors: errors,
    onChange: onChange,
    onSubmit: onSubmit
  }

  return <PetitionEventCreate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const calendar_id = query.calendar_id || null

  return {
    errorStore: state.errorStore,
    calendar: selectCalendarById(state, calendar_id, {}),
    call: selectCallByCalendarId(state, calendar_id, { withCalendar: true, withInscriptionEvent: true }),
    process: selectProcessByCalendarId(state, calendar_id, { withCourse: true })
  }
}

const mapActionsToProps = {
  clearErrors,
  readCalendar,
  readCall,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionEventCreateContainer)
