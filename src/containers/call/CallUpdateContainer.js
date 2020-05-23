/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'

import { clearErrors } from '../../store/actions/error'
import { readCall, updateCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import CallUpdate from '../../components/call/CallUpdate'
import { selectCallById, selectProcessByCallId } from '../../store/selectors/call'
import { validateNumber, validateOpeningDate, validateEndingDate, validateBody } from '../../validation/call'
import { getEmptyKeys, removeEmptyKeys, isEmpty, checkNested } from '../../utils/objectHelpers'

const CallUpdateContainer = props => {
  const id = props.match.params.id
  const { clearErrors, readCall, updateCall, getProcess } = props
  const { call, callLoading, errorStore } = props

  const initialUpdateData = { selectiveProcess_id: '', number: '', openingDate: '', endingDate: '' }
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [readyToLoad, setReadyToLoad] = useState(false)
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readCall(id, {
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

  //Check if have the data to put on form
  useEffect(
    () => {
      if (call && callLoading === false) setReadyToLoad(true)
    },
    [call, callLoading]
  )

  //load Data on form
  useEffect(
    () => {
      if (readyToLoad) {
        setUpdateData({
          selectiveProcess_id: call.selectiveProcess_id,
          number: call.number,
          openingDate: moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
          endingDate: moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
        })
      }
    },
    [readyToLoad]
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
        errorList[e.target.name] = validateOpeningDate(e.target.value, 'update', updateData)
        if (isEmpty(errorList[e.target.name])) {
          errorList['endingDate'] = validateEndingDate(updateData.endingDate, 'update', {
            openingDate: e.target.value
          })
        }
        break
      case 'endingDate':
        errorList[e.target.name] = validateEndingDate(e.target.value, 'update', updateData)
        if (isEmpty(errorList[e.target.name])) {
          errorList['openingDate'] = validateOpeningDate(updateData.openingDate, 'update', {
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

    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
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
        openingDate: moment(updateData.openingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00:00',
        endingDate: moment(updateData.endingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 23:59:59'
      }

      updateCall(call.id, data, {
        callbackOk: call => {
          props.history.push(`/call/read/${call.id}`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    updateData: updateData,
    onChange: onChange,
    errors: errors,
    onSubmit: onSubmit
  }

  return <CallUpdate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const call_id = ownProps.match.params.id

  return {
    call: selectCallById(state, call_id, {}),
    callLoading: state.callStoreV2.loading,
    process: selectProcessByCallId(state, call_id, { withCourse: true }),
    errorStore: state.errorStore
  }
}

const mapActionsToProps = {
  readCall,
  updateCall,
  getProcess,
  clearErrors
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CallUpdateContainer)
