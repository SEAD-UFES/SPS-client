/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../actions/errorActions'
import { getProcess } from '../actions/process'
import { getCallById } from './getCall'

const TesteSelectors = props => {
  const { clearErrors, getProcess } = props
  const { call } = props

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    getProcess('3717788b-37b7-4119-8e6d-1cdd9110d5b9', {
      withCall: {
        withCalendar: true,
        withVacancy: true,
        withInscriptionEvent: true,
        withInscription: true,
        withPerson: true,
        withPetitionEvent: true,
        withPetition: true
      }
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
    call: getCallById(state, '4a473158-595b-4072-80e6-b7891f85d2a1', {
      withCalendar: {
        withInscriptionEvent: {
          withInscription: { withVacancy: true, withPerson: true }
        },
        withPetitionEvent: { withPetition: true }
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
