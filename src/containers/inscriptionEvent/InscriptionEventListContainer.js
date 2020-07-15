/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'

import InscriptionEventList from '../../components/inscriptionEvent/InscriptionEventList'
import { clearErrors } from '../../store/actions/error'
import { readListInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'

import { selectCalendarByCallId } from '../../store/selectors/calendar/calendar'
import { selectCallById } from '../../store/selectors/call/call'
import { selectProcessByCallId } from '../../store/selectors/call/call'

const InscriptionEventListContainer = props => {
  const query = qs.parse(props.location.search)
  const call_id = query.call_id || null
  const { readListInscriptionEvent, readCalendar, readCall, getProcess } = props
  const { history, calendars, iELoading } = props

  const calendarsWithInscriptionEvent = calendars.filter(cld => {
    if (cld.inscriptionEvents && cld.inscriptionEvents.length > 0) return true
    return false
  })

  //componentDidMount
  useEffect(() => {
    clearErrors()
    readListInscriptionEvent({
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
      const arraysOfIE = calendarsWithInscriptionEvent.map(cld => cld.inscriptionEvents.map(ie => ie))
      const iEs = arraysOfIE.reduce((acc, cur) => [...acc, ...cur], [])

      if (iELoading === false && iEs.length === 1) {
        history.push(`/inscription-event/read/${iEs[0].id}`)
      }
    },
    [calendarsWithInscriptionEvent, iELoading]
  )

  const allProps = {
    ...props,
    calendarsWithInscriptionEvent: calendarsWithInscriptionEvent
  }

  return <InscriptionEventList {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const call_id = query.call_id || null

  return {
    errorStore: state.errorStore,
    iELoading: state.inscriptionEventStore.loading,
    calendars: selectCalendarByCallId(state, call_id, { withInscriptionEvent: true }),
    call: selectCallById(state, call_id, {}),
    process: selectProcessByCallId(state, call_id, {})
  }
}

const mapActionsToProps = {
  readListInscriptionEvent,
  readCalendar,
  readCall,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionEventListContainer)
