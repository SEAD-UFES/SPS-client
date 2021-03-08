/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import qs from 'query-string'

import { clearErrors } from '../../store/actions/error'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { createCalendar, readListCalendar } from '../../store/actions/calendar'
import CalendarCreate from '../../components/calendar/CalendarCreate'
import { selectCallById, selectProcessByCallId } from '../../store/selectors/call/call'
import { selectCalendarByCallId } from '../../store/selectors/calendar/calendar'
import { convertObjetsToOptions } from '../../utils/selectorHelpers'
import { getEmptyKeys, removeEmptyKeys, isEmpty, checkNested } from '../../utils/objectHelpers'
import {
  validateName,
  validateStart,
  validateEnd,
  validateReady,
  validateEndPeriod,
  validateBody
} from '../../validation/calendar'

const CalendarCreateContainer = props => {
  const query = qs.parse(props.location.search)
  const call_id = query.call_id || null
  const { clearErrors, readCall, getProcess, createCalendar, readListCalendar } = props
  const { calendars, errorStore } = props

  const initialCreateData = {
    call_id: call_id,
    calendar_id: '',
    name: '',
    ready: false,
    start: '',
    end: ''
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  const calendarOptions = convertObjetsToOptions(calendars)
  calendarOptions.unshift({ label: 'Escolha o evento', value: '' })

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readListCalendar({ call_ids: [call_id] })
    readCall(call_id, {
      callbackOk: call => {
        getProcess(call.selectiveProcess_id)
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
      case 'name':
        errorList[e.target.name] = validateName(e.target.value, 'create')
        break
      case 'start':
        errorList[e.target.name] = validateStart(e.target.value, 'create')
        errorList['end'] = validateEndPeriod(errorList.start, newErrors.end, e.target.value, createData.end)
        break
      case 'end':
        errorList[e.target.name] = validateEnd(e.target.value, 'create')
        errorList['end'] = validateEndPeriod(newErrors.start, errorList.end, createData.start, e.target.value)
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

  const onCheck = e => {
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'ready':
        errorList[e.target.name] = validateReady(e.target.value, 'create')
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

  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(createData, 'create')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...createData,
        calendar_id: createData.calendar_id ? createData.calendar_id : null,
        start: moment(createData.start, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00:00',
        end: createData.end ? moment(createData.end, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 23:59:59' : null
      }

      createCalendar(data, {
        callbackOk: cal => {
          props.history.push(`/call/read/${cal.call_id}`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    createData: createData,
    setCreateData: setCreateData,
    errors: errors,
    calendarOptions: calendarOptions,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit
  }

  return <CalendarCreate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const call_id = query.call_id || null
  try {
    return {
      errorStore: state.errorStore,
      calendars: selectCalendarByCallId(state, call_id, {}),
      call: selectCallById(state, call_id, {}),
      callLoading: state.callStoreV2.loading,
      process: selectProcessByCallId(state, call_id, { withCourse: true })
    }
  } catch (err) {
    console.log(err)
  }
}

const mapActionsToProps = {
  clearErrors,
  readCall,
  getProcess,
  createCalendar,
  readListCalendar
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CalendarCreateContainer)
