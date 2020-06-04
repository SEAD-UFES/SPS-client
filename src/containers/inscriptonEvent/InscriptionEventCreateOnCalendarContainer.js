/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import InscriptionEventCreateOnCalendar from '../../components/inscriptionEvent/InscriptionEventCreateOnCalendar'
import { clearErrors } from '../../store/actions/error'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { selectCalendarById } from '../../store/selectors/calendar'
import { selectCallByCalendarId } from '../../store/selectors/call'
import { selectProcessByCalendarId } from '../../store/selectors/process'
import { numberListOptions } from '../../utils/selectorHelpers'
import { checkNested, isEmpty, getEmptyKeys, removeEmptyKeys } from '../../utils/objectHelpers'
import {
  validateNumberOfInscriptionsAllowed,
  validateAllowMultipleAssignments,
  validateAllowMultipleRegions,
  validateAllowMultipleRestrictions,
  validateBody
} from '../../validation/inscriptionEvent'

const InscriptionEventCreateOnCalendarContainer = props => {
  //const { history } = props
  const id = props.match.params.id
  const { clearErrors, readCalendar, readCall, getProcess } = props
  const { errorStore } = props

  const initialCreateData = {
    calendar_id: id,
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
    readCalendar(id, {
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
        errorList[e.target.name] = validateAllowMultipleAssignments(e.target.value, 'create')
        break
      case 'allowMultipleRegions':
        errorList[e.target.name] = validateAllowMultipleRegions(e.target.value, 'create')
        break
      case 'allowMultipleRestrictions':
        errorList[e.target.name] = validateAllowMultipleRestrictions(e.target.value, 'create')
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
      console.log('toSend:', data)
      // createInscriptionEvent(data, {
      //   callbackOk: iE => {
      //     history.push(`/calendar/read/${iE.calendar_id}`)
      //   }
      // })
    }
  }

  //make props bundle to ViewComponent
  const allProps = {
    createData: createData,
    numberOfInscriptionsAllowedOptions: numberOfInscriptionsAllowedOptions,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit,
    ...props
  }

  return <InscriptionEventCreateOnCalendar {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const calendar_id = ownProps.match.params.id
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
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionEventCreateOnCalendarContainer)
