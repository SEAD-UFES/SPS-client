/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'

import { clearErrors } from '../../store/actions/error'
import { readCall, createCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import CallCreate from '../../components/call/CallCreate'
import { selectProcessById } from '../../store/selectors/process/process'
import { validateNumber, validateOpeningDate, validateEndingDate, validateBody } from '../../validation/call'
import { getEmptyKeys, removeEmptyKeys, isEmpty, checkNested } from '../../utils/objectHelpers'

const CallCreateContainer = props => {
  const id = props.match.params.id
  const { clearErrors, getProcess, createCall } = props
  const { errorStore } = props

  const initialCreateData = { selectiveProcess_id: id, number: '', openingDate: '', endingDate: '' }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    getProcess(id)
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

      createCall(data, {
        callbackOk: call => {
          props.history.push(`/processes/${call.selectiveProcess_id}`)
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
  const process_id = ownProps.match.params.id

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
