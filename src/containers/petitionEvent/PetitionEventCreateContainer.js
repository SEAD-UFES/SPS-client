/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import _ from 'lodash'

import PetitionEventCreate from '../../components/petitionEvent/PetitionEventCreate'
import { clearErrors } from '../../store/actions/error'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { selectCalendarById } from '../../store/selectors/calendar/calendar'
import { selectCallByCalendarId } from '../../store/selectors/call/call'
import { selectProcessByCalendarId } from '../../store/selectors/process/process'
import { checkNested, isEmpty, getEmptyKeys, removeEmptyKeys } from '../../utils/objectHelpers'
import { calendarWithInscriptionEventOptions } from '../../utils/inscriptionEventHelpers'
import { validateInscriptionEventId, validateBody } from '../../validation/petitionEvent'
import { createPetitionEvent } from '../../store/actions/petitionEvent'

const PetitionEventCreateContainer = props => {
  const query = qs.parse(props.location.search)
  const calendar_id = query.calendar_id || null
  const { clearErrors, readCalendar, readCall, getProcess, createPetitionEvent } = props
  const { call, errorStore, history } = props

  //set states and consts
  const initialCreateData = {
    calendar_id: calendar_id,
    inscriptionEvent_id: ''
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  const calendars = call ? call.calendars : []
  const inscriptionEventOptions = calendarWithInscriptionEventOptions(calendars)
  inscriptionEventOptions.unshift({ label: 'Escolha o evento de inscrição associado', value: '' })

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readCalendar(calendar_id, {
      callbackOk: cld => {
        readCall(cld.call_id, {
          withCalendar: { withFatherCalendar: { recursive: true }, withInscriptionEvent: true },
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
  const onChange = e => {
    e.preventDefault()

    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'inscriptionEvent_id':
        errorList[e.target.name] = validateInscriptionEventId(e.target.value)
        break
      default:
        break
    }

    //remove empty errors if needed
    const keysToRemove = getEmptyKeys(errorList)
    if (!isEmpty(keysToRemove)) newErrors = _.omit(newErrors, keysToRemove)

    //add errors if needed
    const toAdd = removeEmptyKeys(errorList)
    if (!isEmpty(toAdd)) newErrors = { ...newErrors, ...toAdd }

    setCreateData({ ...createData, [e.target.name]: e.target.value })
    setErrors(newErrors)
  }

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(createData, 'create')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...createData
      }

      createPetitionEvent(data, {
        callbackOk: pE => {
          history.push(`/calendar/read/${pE.calendar_id}`)
        }
      })
    }
  }

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
  getProcess,
  createPetitionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionEventCreateContainer)
