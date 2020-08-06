/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { readCall, deleteCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import CallDelete from '../../components/call/CallDelete'
import { selectCallById } from '../../store/selectors/call/call'
import { selectProcessByCallId } from '../../store/selectors/process/process'
import { checkNested } from '../../utils/objectHelpers'

const CallDeleteContainer = props => {
  const id = props.match.params.id
  const { call, process, errorStore } = props
  const { clearErrors, readCall, getProcess, deleteCall } = props
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

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    deleteCall(call.id, {
      callbackOk: () => {
        props.history.push(`/processes/read/${process.id}`)
      }
    })
  }

  //allProps
  const allProps = {
    ...props,
    errors: errors,
    onSubmit: onSubmit
  }

  //render
  return <CallDelete {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const call_id = ownProps.match.params.id
  return {
    errorStore: state.errorStore,
    call: selectCallById(state, call_id, {}),
    callLoading: state.callStoreV2.loading,
    process: selectProcessByCallId(state, call_id, { withCourse: true })
  }
}

const mapActionsToProps = {
  clearErrors,
  readCall,
  getProcess,
  deleteCall
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CallDeleteContainer)
