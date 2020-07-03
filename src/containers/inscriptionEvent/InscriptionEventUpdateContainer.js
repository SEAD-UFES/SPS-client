/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import InscriptionEventUpdate from '../../components/inscriptionEvent/InscriptionEventUpdate'
import { clearErrors } from '../../store/actions/error'
import { readInscriptionEvent, updateInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { selectInscriptionEventById } from '../../store/selectors/inscriptionEvent/selectInscriptionEventById'
import { selectCalendarByInscriptionEventId } from '../../store/selectors/calendar/calendar'
import { selectCallByInscriptionEventId } from '../../store/selectors/call/call'
import { selectProcessByInscriptionEventId } from '../../store/selectors/process/process'
import { numberListOptions } from '../../utils/selectorHelpers'
import { checkNested, isEmpty, getEmptyKeys, removeEmptyKeys } from '../../utils/objectHelpers'
import {
  validateNumberOfInscriptionsAllowed,
  validateAllowMultipleAssignments,
  validateAllowMultipleRegions,
  validateAllowMultipleRestrictions,
  validateBody
} from '../../validation/inscriptionEvent'

const InscriptionEventUpdateContainer = props => {
  const id = props.match.params.id
  const { clearErrors, readInscriptionEvent, readCalendar, readCall, getProcess, updateInscriptionEvent } = props
  const { errorStore, inscriptionEvent, inscriptionEventLoading, history } = props

  const initialUpdateData = {
    calendar_id: '',
    numberOfInscriptionsAllowed: '0',
    allowMultipleAssignments: false,
    allowMultipleRegions: false,
    allowMultipleRestrictions: false
  }
  const [readyToLoad, setReadyToLoad] = useState(false)
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [errors, setErrors] = useState({})
  const numberOfInscriptionsAllowedOptions = numberListOptions(20)

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readInscriptionEvent(id, {
      callbackOk: iE => {
        readCalendar(iE.calendar_id, {
          callbackOk: cld => {
            readCall(cld.call_id, {
              callbackOk: call => {
                getProcess(call.selectiveProcess_id)
              }
            })
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

  //Check if have the data to put on form
  useEffect(
    () => {
      if (inscriptionEvent && inscriptionEventLoading === false) setReadyToLoad(true)
    },
    [inscriptionEvent, inscriptionEventLoading]
  )

  //load Data on form
  useEffect(
    () => {
      if (readyToLoad) {
        setUpdateData({
          calendar_id: inscriptionEvent.calendar_id,
          numberOfInscriptionsAllowed: inscriptionEvent.numberOfInscriptionsAllowed,
          allowMultipleAssignments: inscriptionEvent.allowMultipleAssignments,
          allowMultipleRegions: inscriptionEvent.allowMultipleRegions,
          allowMultipleRestrictions: inscriptionEvent.allowMultipleRestrictions
        })
      }
    },
    [readyToLoad]
  )

  //onChange
  const onChange = e => {
    e.preventDefault()
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'numberOfInscriptionsAllowed':
        errorList[e.target.name] = validateNumberOfInscriptionsAllowed(e.target.value, 'update')
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

    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    setErrors(newErrors)
  }

  //onCheck
  const onCheck = e => {
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'allowMultipleAssignments':
        errorList[e.target.name] = validateAllowMultipleAssignments(!updateData[e.target.name], 'update')
        break
      case 'allowMultipleRegions':
        errorList[e.target.name] = validateAllowMultipleRegions(!updateData[e.target.name], 'update')
        break
      case 'allowMultipleRestrictions':
        errorList[e.target.name] = validateAllowMultipleRestrictions(!updateData[e.target.name], 'update')
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

    setUpdateData({ ...updateData, [e.target.name]: !updateData[e.target.name] })
    setErrors(newErrors)
  }

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(updateData, 'update')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...updateData
      }
      updateInscriptionEvent(inscriptionEvent.id, data, {
        callbackOk: iE => {
          history.push(`/calendar/read/${iE.calendar_id}`)
        }
      })
    }
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    updateData: updateData,
    numberOfInscriptionsAllowedOptions: numberOfInscriptionsAllowedOptions,
    errors: errors,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit
  }

  return <InscriptionEventUpdate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const iEvent_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    inscriptionEvent: selectInscriptionEventById(state, iEvent_id, {}),
    inscriptionEventLoading: state.inscriptionEventStore.loading,
    calendar: selectCalendarByInscriptionEventId(state, iEvent_id, {}),
    call: selectCallByInscriptionEventId(state, iEvent_id, {}),
    process: selectProcessByInscriptionEventId(state, iEvent_id, {})
  }
}

const mapActionsToProps = {
  clearErrors,
  readInscriptionEvent,
  readCalendar,
  readCall,
  getProcess,
  updateInscriptionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionEventUpdateContainer)
