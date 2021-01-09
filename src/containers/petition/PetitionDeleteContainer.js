/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PetitionDelete from '../../components/petition/PetitionDelete'
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

const PetitionDeleteContainer = props => {
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
    deletePetition
  } = props
  const { errorStore, petition } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readPetition(id, {
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

  return <PetitionDelete {...allProps} />
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
      }
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
  deletePetition
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionDeleteContainer)
