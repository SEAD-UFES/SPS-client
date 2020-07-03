/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import InscriptionDelete from '../../components/inscription/InscriptionDelete'
import { clearErrors } from '../../store/actions/error'
import { readInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { deleteInscription } from '../../store/actions/inscription'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { checkNested } from '../../utils/objectHelpers'
import { readInscription } from '../../store/actions/inscription'
import { selectInscriptionById } from '../../store/selectors/inscription/inscription'
import { selectInscriptionEventByInscriptionId } from '../../store/selectors/inscriptionEvent/selectInscriptionEventByInscriptionId'
import { selectCalendarByInscriptionId } from '../../store/selectors/calendar/selectCalendarByInscriptionId'
import { selectCallByInscriptionId } from '../../store/selectors/call/selectCallByInscriptionId'
import { selectProcessByInscriptionId } from '../../store/selectors/process/selectProcessByInscriptionId'
import { getEmptyKeys, removeEmptyKeys, isEmpty } from '../../utils/objectHelpers'
import { validateDescription } from '../../validation/inscription'

const InscriptionDeleteContainer = props => {
  const id = props.match.params.id
  const { history } = props
  const {
    clearErrors,
    readInscriptionEvent,
    readCalendar,
    readCall,
    getProcess,
    deleteInscription,
    readInscription
  } = props
  const initialData = { description: '' }
  const [deleteData, setDeleteData] = useState(initialData)
  const { errorStore, inscription } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readInscription(id, {
      withVacancy: true,
      withPerson: true,
      withAssignment: true,
      withRegion: true,
      withRestriction: true,
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

  //onChange
  const onChange = e => {
    e.preventDefault()
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'description':
        errorList[e.target.name] = validateDescription(e.target.value, 'delete')
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

    setDeleteData({ ...deleteData, [e.target.name]: e.target.value })
    setErrors(newErrors)
  }

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    deleteInscription(inscription.id, {
      body: deleteData,
      callbackOk: () => {
        history.push(`/inscription-event/read/${inscription.inscriptionEvent_id}`)
      }
    })
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    deleteData: deleteData,
    errors: errors,
    onChange: onChange,
    onSubmit: onSubmit
  }

  return <InscriptionDelete {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const inscription_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    inscription: selectInscriptionById(state, inscription_id, {
      withPerson: true,
      withVacancy: true,
      withAssignment: true,
      withRegion: true,
      withRestriction: true
    }),
    inscriptionLoading: state.inscriptionStore.loading,
    inscriptionEvent: selectInscriptionEventByInscriptionId(state, inscription_id, {}),
    calendar: selectCalendarByInscriptionId(state, inscription_id, {}),
    call: selectCallByInscriptionId(state, inscription_id, {}),
    process: selectProcessByInscriptionId(state, inscription_id, {})
  }
}

const mapActionsToProps = {
  clearErrors,
  readInscription,
  readInscriptionEvent,
  readCalendar,
  readCall,
  getProcess,
  deleteInscription
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionDeleteContainer)
