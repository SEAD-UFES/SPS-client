/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'

import { clearErrors } from '../../store/actions/error'
import { readCallV2 } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { readCalendar, readListCalendar, updateCalendar } from '../../store/actions/calendar'
import CalendarUpdate from '../../components/calendar/CalendarUpdate'
import { convertObjetsToOptions } from '../../utils/selectorHelpers'
import { getEmptyKeys, removeEmptyKeys, isEmpty, checkNested } from '../../utils/objectHelpers'
import {
  validateName,
  validateStart,
  validateEnd,
  validateEndPeriod,
  validateReady,
  validateBody
} from '../../validation/calendar'
import { selectCalendarById, selectBrotherCalendarById } from '../../store/selectors/calendar'
import { selectCallByCalendarId } from '../../store/selectors/call'
import { selectProcessByCalendarId } from '../../store/selectors/process'
import { removePotentialCircRef } from '../../utils/calendarHelpers'

const CalendarUpdateContainer = props => {
  const id = props.match.params.id
  const { clearErrors, readCalendar, readListCalendar, readCallV2, getProcess, updateCalendar } = props
  const { calendar, calendarLoading, calendars, errorStore } = props

  const initialUpdateData = {
    call_id: '',
    calendar_id: '',
    name: '',
    ready: false,
    start: '',
    end: ''
  }
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [readyToLoad, setReadyToLoad] = useState(false)
  const [errors, setErrors] = useState({})

  //Gerando as opções possiveis para calendar_id
  const filtredCalendars = removePotentialCircRef(calendar, calendars)
  const calendarOptions = convertObjetsToOptions(filtredCalendars)
  calendarOptions.unshift({ label: 'Escolha o evento', value: '' })

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readCalendar(id, {
      callbackOk: cld => {
        readListCalendar({ call_ids: [cld.call_id] })
        readCallV2(cld.call_id, {
          callbackOk: call => {
            getProcess(call.selectiveProcess_id)
          }
        })
      }
    })
  }, [])

  //Check if have the data to put on form
  useEffect(
    () => {
      if (calendar && calendarLoading === false) setReadyToLoad(true)
    },
    [calendar, calendarLoading]
  )

  //load Data on form
  useEffect(
    () => {
      if (readyToLoad) {
        setUpdateData({
          call_id: calendar.call_id,
          calendar_id: calendar.calendar_id ? calendar.calendar_id : '',
          name: calendar.name,
          ready: calendar.ready,
          start: moment(calendar.start).format('YYYY-MM-DD'),
          end: calendar.end ? moment(calendar.end).format('YYYY-MM-DD') : ''
        })
      }
    },
    [readyToLoad]
  )

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
        errorList['end'] = validateEndPeriod(errorList.start, newErrors.end, e.target.value, updateData.end)
        break
      case 'end':
        errorList[e.target.name] = validateEnd(e.target.value, 'create')
        errorList['end'] = validateEndPeriod(newErrors.start, errorList.end, updateData.start, e.target.value)
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

  const onCheck = e => {
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'ready':
        errorList[e.target.name] = validateReady(e.target.value, 'update')
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

  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(updateData, 'update')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...updateData,
        calendar_id: updateData.calendar_id ? updateData.calendar_id : null,
        start: moment(updateData.start, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00:00',
        end: updateData.end ? moment(updateData.end, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 23:59:59' : null
      }

      updateCalendar(id, data, {
        callbackOk: cld => {
          props.history.push(`/call/read/${cld.call_id}`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    updateData: updateData,
    calendarOptions: calendarOptions,
    errors: errors,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit
  }

  return <CalendarUpdate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const calendar_id = ownProps.match.params.id
  return {
    errorStore: state.errorStore,
    calendars: selectBrotherCalendarById(state, calendar_id, {}),
    calendar: selectCalendarById(state, calendar_id, {}),
    calendarLoading: state.calendarStore.loading,
    call: selectCallByCalendarId(state, calendar_id, {}),
    process: selectProcessByCalendarId(state, calendar_id, { withCourse: true })
  }
}

const mapActionsToProps = {
  clearErrors,
  readCalendar,
  readListCalendar,
  readCallV2,
  getProcess,
  updateCalendar
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CalendarUpdateContainer)
