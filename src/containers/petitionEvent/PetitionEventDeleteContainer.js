/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PetitionEventDelete from '../../components/petitionEvent/PetitionEventDelete'
import { clearErrors } from '../../store/actions/error'
import { readPetitionEvent, deletePetitionEvent } from '../../store/actions/petitionEvent'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { readInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { checkNested } from '../../utils/objectHelpers'
import { selectPetitionEventById_noMemo } from '../../store/selectors/petitionEvent/selectPetitionEventById_noMemo'
import { selectCalendarByPetitionEventId_noMemo } from '../../store/selectors/calendar/selectCalendarByPetitionEventId_noMemo'
import { selectCallByPetitionEventId_noMemo } from '../../store/selectors/call/selectCallByPetitionEventId_noMemo'
import { selectProcessByPetitionEventId_noMemo } from '../../store/selectors/process/selectProcessByPetitionEventId_noMemo'

const PetitionEventCreateContainer = props => {
  const id = props.match.params.id
  const { history } = props
  const {
    clearErrors,
    readPetitionEvent,
    readInscriptionEvent,
    readCalendar,
    readCall,
    getProcess,
    deletePetitionEvent
  } = props
  const { errorStore, petitionEvent } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readPetitionEvent(id, {
      callbackOk: pE => {
        //baixar calendar
        readCalendar(pE.calendar_id, {
          callbackOk: cld => {
            readCall(cld.call_id, {
              callbackOk: call => {
                getProcess(call.selectiveProcess_id)
              }
            })
          }
        })

        //baixar inscriptionEvent
        readInscriptionEvent(pE.inscriptionEvent_id, {
          callbackOk: iE => {
            //baixar calendar de inccriptionEvent
            readCalendar(iE.calendar_id, {})
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

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    deletePetitionEvent(petitionEvent.id, {
      callbackOk: () => {
        history.push(`/calendar/read/${petitionEvent.calendar_id}`)
      }
    })
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    errors: errors,
    onSubmit: onSubmit
  }

  return <PetitionEventDelete {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const pEvent_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    petitionEvent: selectPetitionEventById_noMemo(state, pEvent_id, { withInscriptionEvent: { withCalendar: true } }),
    petitionEventLoading: state.petitionEventStore.loading,
    calendar: selectCalendarByPetitionEventId_noMemo(state, pEvent_id, {}),
    call: selectCallByPetitionEventId_noMemo(state, pEvent_id, {}),
    process: selectProcessByPetitionEventId_noMemo(state, pEvent_id, {})
  }
}

const mapActionsToProps = {
  clearErrors,
  readPetitionEvent,
  readInscriptionEvent,
  readCalendar,
  readCall,
  getProcess,
  deletePetitionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionEventCreateContainer)
