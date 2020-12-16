/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'

import PetitionEventList from '../../components/petitionEvent/PetitionEventList'
import { clearErrors } from '../../store/actions/error'
import { readListPetitionEvent } from '../../store/actions/petitionEvent'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'

import { selectCalendarByCallId } from '../../store/selectors/calendar/calendar'
import { selectCallById } from '../../store/selectors/call/call'
import { selectProcessByCallId } from '../../store/selectors/call/call'

const PetitionEventListContainer = props => {
  const query = qs.parse(props.location.search)
  const call_id = query.call_id || null
  const { readListPetitionEvent, readCalendar, readCall, getProcess } = props
  const { history, calendars, pELoading } = props

  console.log('calendars', calendars)

  const calendarsWithPetitionEvent = calendars.filter(cld => {
    if (cld.petitionEvents && cld.petitionEvents.length > 0) return true
    return false
  })

  //componentDidMount
  useEffect(() => {
    clearErrors()
    readListPetitionEvent({
      call_id: call_id,
      callbackOk: iEs => {
        if (iEs.length > 0) {
          readCalendar(iEs[0].calendar_id, {
            callbackOk: cld => {
              readCall(cld.call_id, {
                callbackOk: call => {
                  getProcess(call.selectiveProcess_id)
                }
              })
            }
          })
        }
      }
    })
  }, [])

  //Se houver apenas um evento, redirecionar para esse evento.
  useEffect(
    () => {
      const arraysOfPE = calendarsWithPetitionEvent.map(cld => cld.petitionEvents.map(pe => pe))
      const pEs = arraysOfPE.reduce((acc, cur) => [...acc, ...cur], [])

      if (pELoading === false && pEs.length === 1) {
        history.replace(`/petition-event/read/${pEs[0].id}`)
      }
    },
    [calendarsWithPetitionEvent, pELoading]
  )

  const allProps = {
    ...props,
    calendarsWithPetitionEvent: calendarsWithPetitionEvent
  }

  return <PetitionEventList {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const call_id = query.call_id || null

  return {
    errorStore: state.errorStore,
    pELoading: state.petitionEventStore.loading,
    calendars: selectCalendarByCallId(state, call_id, { withPetitionEvent: true }),
    call: selectCallById(state, call_id, {}),
    process: selectProcessByCallId(state, call_id, {}),
    profileStore: state.profileStore
  }
}

const mapActionsToProps = {
  readListPetitionEvent,
  readCalendar,
  readCall,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionEventListContainer)
