/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import qs from 'query-string'

import { clearErrors } from '../../store/actions/error'
import { readCall, createCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import CallCreate from '../../components/call/CallCreate'
import { selectProcessById } from '../../store/selectors/process/process'
import { validateNumber, validateOpeningDate, validateEndingDate, validateBody } from '../../validation/call'
import { getEmptyKeys, removeEmptyKeys, isEmpty, checkNested } from '../../utils/objectHelpers'

const CallCreateContainer = props => {
  const query = qs.parse(props.location.search)
  const process_id = query.process_id || null
  const { clearErrors, getProcess, createCall } = props
  const { errorStore } = props

  const initialCreateData = {
    selectiveProcess_id: process_id,
    number: '',
    openingDate: '',
    endingDate: ''
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    getProcess(process_id)
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

  const onChange = e => {
    e.preventDefault()
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'number':
        errorList[e.target.name] = validateNumber(e.target.value, 'update')
        break
      case 'openingDate':
        errorList[e.target.name] = validateOpeningDate(e.target.value, 'update', createData)
        if (isEmpty(errorList[e.target.name])) {
          errorList['endingDate'] = validateEndingDate(createData.endingDate, 'update', {
            openingDate: e.target.value
          })
        }
        break
      case 'endingDate':
        errorList[e.target.name] = validateEndingDate(e.target.value, 'update', createData)
        if (isEmpty(errorList[e.target.name])) {
          errorList['openingDate'] = validateOpeningDate(createData.openingDate, 'update', {
            endingDate: e.target.value
          })
        }
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

  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(createData, 'update')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...createData,
        openingDate: moment(createData.openingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00:00',
        endingDate: moment(createData.endingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 23:59:59'
      }

      const oD = moment(data.openingDate, 'YYYY-MM-DD HH:mm:ss')
      const eD = moment(data.endingDate, 'YYYY-MM-DD HH:mm:ss')

      console.log('moment data')
      console.log('oD:', oD)
      console.log('\n')
      console.log('eD:', eD)
      console.log('\n')

      createCall(data, {
        callbackOk: call => {
          props.history.push(`/processes/read/${call.selectiveProcess_id}`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    createData: createData,
    errors: errors,
    onChange: onChange,
    onSubmit: onSubmit
  }

  return <CallCreate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const process_id = query.process_id || null
  return {
    process: selectProcessById(state, process_id, { withCourse: true }),
    processLoading: state.processStore.loading,
    errorStore: state.errorStore
  }
}

const mapActionsToProps = {
  readCall,
  createCall,
  getProcess,
  clearErrors
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CallCreateContainer)
