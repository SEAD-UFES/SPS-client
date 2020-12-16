/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import _ from 'lodash'

import { clearErrors } from '../../../actions/errorActions'
import { getProcess } from '../../actions/process'
import { getProcessById } from './getProcess'
import { getCallById } from './getCall'

const TesteSelectors = props => {
  const { clearErrors, getProcess } = props
  const { process, call } = props

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    getProcess('3717788b-37b7-4119-8e6d-1cdd9110d5b9', {
      withCall: true,
      withCalendar: true,
      withVacancy: true,
      withInscriptionEvent: true,
      withInscription: true,
      withPerson: true,
      withPetitionEvent: true
    })
  }, [])

  return (
    <div>
      {/* <div>
        <p>process</p>
        <pre>{process ? JSON.stringify(process, null, 2) : null}</pre>
      </div> */}

      <div>
        <p>call</p>
        <pre>{call ? JSON.stringify(call, null, 2) : null}</pre>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    process: getProcessById(state, '3717788b-37b7-4119-8e6d-1cdd9110d5b9', {
      withCall: { withCalendar: true }
    }),
    call: getCallById(state, '4a473158-595b-4072-80e6-b7891f85d2a1', {
      withCalendar: {
        withInscriptionEvent: {
          withInscription: { withVacancy: true, withPerson: true }
        },
        withPetitionEvent: { withCalendar: { withCall: { withProcess: true } } }
      },
      withVacancy: true
    }),
    calendar: {}
  }
}

const mapActionsToProps = {
  clearErrors,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TesteSelectors)
