/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import qs from 'query-string'

import InscriptionEventCreateOnCalendar from '../../components/inscriptionEvent/InscriptionEventCreateOnCalendar'
import { clearErrors } from '../../store/actions/error'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { createInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { getProcess } from '../../store/actions/process'
import { selectCalendarById } from '../../store/selectors/calendar/calendar'
import { selectCallByCalendarId } from '../../store/selectors/call/call'
import { selectProcessByCalendarId } from '../../store/selectors/process/process'
import { numberListOptions } from '../../utils/selectorHelpers'
import { checkNested, isEmpty, getEmptyKeys, removeEmptyKeys } from '../../utils/objectHelpers'
import {
  validateNumberOfInscriptionsAllowed,
  validateAllowMultipleAssignments,
  validateAllowMultipleRegions,
  validateAllowMultipleRestrictions,
  validateBody
} from '../../validation/inscriptionEvent'

const InscriptionEventCreateContainer = props => {
  const query = qs.parse(props.location.search)
  const calendar_id = query.calendar_id || null
  const { clearErrors, readCalendar, readCall, getProcess, createInscriptionEvent } = props
  const { errorStore, history } = props

  const initialCreateData = {
    calendar_id: calendar_id,
    numberOfInscriptionsAllowed: '0',
    allowMultipleAssignments: true,
    allowMultipleRegions: true,
    allowMultipleRestrictions: true
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})
  const numberOfInscriptionsAllowedOptions = numberListOptions(20)

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readCalendar(calendar_id, {
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

  //onChange
  const onChange = e => {
    e.preventDefault()
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'numberOfInscriptionsAllowed':
        errorList[e.target.name] = validateNumberOfInscriptionsAllowed(e.target.value, 'create')
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

  //onCheck
  const onCheck = e => {
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'allowMultipleAssignments':
        errorList[e.target.name] = validateAllowMultipleAssignments(!createData[e.target.name], 'create')
        break
      case 'allowMultipleRegions':
        errorList[e.target.name] = validateAllowMultipleRegions(!createData[e.target.name], 'create')
        break
      case 'allowMultipleRestrictions':
        errorList[e.target.name] = validateAllowMultipleRestrictions(!createData[e.target.name], 'create')
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

    setCreateData({ ...createData, [e.target.name]: !createData[e.target.name] })
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
      createInscriptionEvent(data, {
        callbackOk: iE => {
          history.push(`/calendar/read/${iE.calendar_id}`)
        }
      })
    }
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    createData: createData,
    numberOfInscriptionsAllowedOptions: numberOfInscriptionsAllowedOptions,
    errors: errors,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit
  }

  return <InscriptionEventCreateOnCalendar {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const calendar_id = query.calendar_id || null
  return {
    errorStore: state.errorStore,
    calendar: selectCalendarById(state, calendar_id, {}),
    call: selectCallByCalendarId(state, calendar_id, {}),
    process: selectProcessByCalendarId(state, calendar_id, { withCourse: true })
  }
}

const mapActionsToProps = {
  clearErrors,
  readCalendar,
  readCall,
  getProcess,
  createInscriptionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionEventCreateContainer)
