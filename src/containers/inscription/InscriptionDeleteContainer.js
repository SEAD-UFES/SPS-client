/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import InscriptionDelete from '../../components/inscription/InscriptionDelete'
import { clearErrors } from '../../store/actions/error'
import { readInscriptionEvent, deleteInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { selectCalendarByInscriptionEventId } from '../../store/selectors/calendar'
import { selectCallByInscriptionEventId } from '../../store/selectors/call'
import { selectProcessByInscriptionEventId } from '../../store/selectors/process'
import { checkNested } from '../../utils/objectHelpers'
import { readInscription } from '../../store/actions/inscription'
import { selectInscriptionById } from '../../store/selectors/inscription/inscription'
import { selectInscriptionEventByInscriptionId } from '../../store/selectors/inscriptionEvent/selectInscriptionEventByInscriptionId'

const InscriptionDeleteContainer = props => {
  const id = props.match.params.id
  const { history } = props
  const {
    clearErrors,
    readInscriptionEvent,
    readCalendar,
    readCall,
    getProcess,
    deleteInscriptionEvent,
    readInscription
  } = props
  const { errorStore, inscriptionEvent } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readInscription(id, {
      callbackOk: ins => {
        readInscriptionEvent(ins.inscriptionEvent_id, {
          callbackOk: iE => {
            readCalendar(iE.calendar_id, {
              callbackOk: cld => {
                readCall(cld.call_id, {
                  callbackOk: call => {
                    getProcess(call.selectiveProcess_id)
                  }
                })
              }
            })
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

    deleteInscriptionEvent(inscriptionEvent.id, {
      callbackOk: () => {
        history.push(`/calendar/read/${inscriptionEvent.calendar_id}`)
      }
    })
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    errors: errors,
    onSubmit: onSubmit
  }

  return <InscriptionDelete {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const iEvent_id = ownProps.match.params.id
  const inscription_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    inscription: selectInscriptionById(state, inscription_id, {}),
    inscriptionEvent: selectInscriptionEventByInscriptionId(state, inscription_id, {}),
    inscriptionEventLoading: state.inscriptionEventStore.loading,
    calendar: selectCalendarByInscriptionEventId(state, iEvent_id, {}),
    call: selectCallByInscriptionEventId(state, iEvent_id, {}),
    process: selectProcessByInscriptionEventId(state, iEvent_id, {})
  }
}

const mapActionsToProps = {
  clearErrors,
  readInscription,
  readInscriptionEvent,
  readCalendar,
  readCall,
  getProcess,
  deleteInscriptionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionDeleteContainer)
