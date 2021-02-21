/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import _ from 'lodash'

import PetitionReplyCreate from '../../components/petitionReply/PetitionReplyCreate'
import { clearErrors } from '../../store/actions/error'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { checkNested } from '../../utils/objectHelpers'
import { readInscription } from '../../store/actions/inscription'
import { getPetitionById } from '../../store/selectorsV2/getPetition'
import { readPetition } from '../../store/actions/petition'
import { readPetitionEvent } from '../../store/actions/petitionEvent'
import { readPerson } from '../../store/actions/person'
import { createPetitionReply } from '../../store/actions/petitionReply'
import { getEmptyKeys, removeEmptyKeys, isEmpty } from '../../utils/objectHelpers'
import { validatePetitionId, validateStatus, validateJustification, validateBody } from '../../validation/petitionReply'
import { convertStringToBoolean } from '../../utils/typeHelpers'

const PetitionReplyCreateContainer = props => {
  //capturar petition_id da query
  const query = qs.parse(props.location.search)
  const petition_id = query.petition_id || null

  //variaveis de props
  const { history } = props
  const {
    clearErrors,
    readPetition,
    readPetitionEvent,
    readCalendar,
    readCall,
    getProcess,
    readInscription,
    readPerson,
    createPetitionReply
  } = props
  const { errorStore } = props

  //state do component
  const initialCreateData = {
    petition_id: petition_id,
    accepted: '',
    justification: ''
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  //acceptedOptions
  const acceptedOptions = [
    { label: 'Selecione o status', value: '' },
    { label: 'Deferido', value: true },
    { label: 'Indeferido', value: false }
  ]

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readPetition(petition_id, {
      callbackOk: pet => {
        readPetitionEvent(pet.petitionEvent_id, {
          callbackOk: pE => {
            readCalendar(pE.calendar_id, {
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
        readInscription(pet.inscription_id, {
          withVacancy: { withAssignment: true, withRegion: true, withRestriction: true },
          callbackOk: ins => {
            readPerson(ins.person_id, {})
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
      case 'petition_id':
        errorList[e.target.name] = validatePetitionId(e.target.value, 'create')
        break
      case 'justification':
        errorList[e.target.name] = validateJustification(e.target.value, 'create')
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

  //onChangeAccepted
  const onChangeAccepted = e => {
    e.preventDefault()
    let newErrors = { ...errors }
    const acceptedError = validateStatus(e.target.value, 'create')
    if (acceptedError) newErrors = { ...newErrors, accepted: acceptedError }
    else delete newErrors.accepted
    setCreateData({ ...createData, accepted: convertStringToBoolean(e.target.value) })
    setErrors(newErrors)
  }

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(createData, 'create')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      createPetitionReply(createData, {
        callbackOk: petitionReply => {
          history.push(`/petition/read/${petitionReply.petition_id}`)
        }
      })
    }
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    createData: createData,
    errors: errors,
    acceptedOptions: acceptedOptions,
    onChange: onChange,
    onChangeAccepted: onChangeAccepted,
    onSubmit: onSubmit
  }

  return <PetitionReplyCreate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const petition_id = query.petition_id || null

  return {
    petition: getPetitionById(state, petition_id, {
      withPetitionEvent: {
        withCalendar: {
          withCall: {
            withProcess: true
          }
        }
      },
      withInscription: {
        withPerson: true,
        withVacancy: {
          withAssignment: true,
          withRegion: true,
          withRestriction: true
        }
      },
      withPetitionReply: true
    }),
    errorStore: state.errorStore,
    profileStore: state.profileStore
  }
}

const mapActionsToProps = {
  clearErrors,
  readPetition,
  readPetitionEvent,
  readCalendar,
  readCall,
  getProcess,
  readInscription,
  readPerson,
  createPetitionReply
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionReplyCreateContainer)
