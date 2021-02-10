/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import PetitionRead from '../../components/petition/PetitionRead'
import { clearErrors } from '../../store/actions/error'
import { readCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { checkNested } from '../../utils/objectHelpers'
import { readInscription } from '../../store/actions/inscription'
import { getPetitionById } from '../../store/selectorsV2/getPetition'
import { readPetition, deletePetition } from '../../store/actions/petition'
import { readPetitionEvent } from '../../store/actions/petitionEvent'
import { readPerson } from '../../store/actions/person'
import { readListPetitionReply } from '../../store/actions/petitionReply'

const PetitionReadContainer = props => {
  const id = props.match.params.id
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
    deletePetition,
    readListPetitionReply
  } = props
  const { errorStore, petition } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readPetition(id, {
      callbackOk: pet => {
        readListPetitionReply({ petition_ids: [pet.id] })
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
          withVacancy: true,
          withAssignment: true,
          withRegion: true,
          withRestriction: true,
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

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    deletePetition(petition.id, {
      callbackOk: () => {
        history.push(`/petition-event/read/${petition.petitionEvent_id}`)
      }
    })
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    errors: errors,
    onSubmit: onSubmit
  }

  return <PetitionRead {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const petition_id = ownProps.match.params.id

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
    profileStore: state.profileStore,
    petitionReplyLoading: state.petitionReplyStore.loading
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
  deletePetition,
  readListPetitionReply
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionReadContainer)
