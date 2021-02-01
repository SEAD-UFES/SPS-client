/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import PetitionEventRead from '../../components/petitionEvent/PetitionEventRead'
import { clearErrors } from '../../store/actions/error'
import { readPetitionEvent } from '../../store/actions/petitionEvent'
import { readCalendar, readListCalendar } from '../../store/actions/calendar'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { getPetitionEventById } from '../../store/selectorsV2/getPetitionEvent'
import { selectCalendarByPetitionEventId_noMemo } from '../../store/selectors/calendar/selectCalendarByPetitionEventId_noMemo'
import { selectCallByPetitionEventId_noMemo } from '../../store/selectors/call/selectCallByPetitionEventId_noMemo'
import { selectProcessByPetitionEventId_noMemo } from '../../store/selectors/process/selectProcessByPetitionEventId_noMemo'
import { readInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { checkNested } from '../../utils/objectHelpers'

const PetitionEventReadContainer = props => {
  const id = props.match.params.id
  const {
    clearErrors,
    readPetitionEvent,
    readCalendar,
    readListCalendar,
    readCall,
    getProcess,
    readInscriptionEvent
  } = props
  const { profileStore, petitionEvent } = props

  //calcular MyPetitions
  const [myPetitions, setMyPetitions] = useState([])
  useEffect(
    () => {
      const person_id = checkNested(profileStore, 'profile', 'Person', 'id') ? profileStore.profile.Person.id : null
      const petitions = checkNested(petitionEvent, 'petitions') ? petitionEvent.petitions : []

      console.log('person_id', person_id)
      console.log('petitions', petitions)

      const myP = petitions.reduce((acc, curr) => {
        const petitionPersonId = checkNested(curr, 'inscription', 'person_id') ? curr.inscription.person_id : null
        if (petitionPersonId === person_id) acc = [...acc, curr]
        return acc
      }, [])

      console.log('myP', myP)

      setMyPetitions(myP)
    },
    [profileStore, petitionEvent]
  )

  //componentDidMount
  useEffect(() => {
    //clear errors
    clearErrors()
    //get PetitionEvent
    readPetitionEvent(id, {
      withPetition: {
        withInscription: {
          withPerson: true,
          withVacancy: { withAssignment: true, withRegion: true, withRestriction: true }
        }
      },
      callbackOk: pEvent => {
        //get Calendar
        readCalendar(pEvent.calendar_id, {
          callbackOk: cld => {
            //get brotherCalendars
            readListCalendar({ call_ids: [cld.call_id] })
            //get Call
            readCall(cld.call_id, {
              callbackOk: call => {
                //get Process
                getProcess(call.selectiveProcess_id, {})
              }
            })
          }
        })

        //get InscriptionEvent
        readInscriptionEvent(pEvent.inscriptionEvent_id, {
          callbackOk: iE => {
            readCalendar(iE.calendar_id, {})
          }
        })
      }
    })
  }, [])

  const allProps = {
    ...props,
    myPetitions: myPetitions
  }

  return <PetitionEventRead {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const pEvent_id = ownProps.match.params.id

  return {
    petitionEvent: getPetitionEventById(state, pEvent_id, {
      withInscriptionEvent: {
        withCalendar: true
      },
      withPetition: {
        withInscription: {
          withPerson: true,
          withVacancy: {
            withAssignment: true,
            withRegion: true,
            withRestriction: true
          }
        }
      }
    }),
    calendar: selectCalendarByPetitionEventId_noMemo(state, pEvent_id, {}),
    call: selectCallByPetitionEventId_noMemo(state, pEvent_id, {}),
    process: selectProcessByPetitionEventId_noMemo(state, pEvent_id, {}),
    errorStore: state.errorStore,
    authStore: state.authStore,
    profileStore: state.profileStore
  }
}

const mapActionsToProps = {
  clearErrors,
  readPetitionEvent,
  readCalendar,
  readListCalendar,
  readCall,
  getProcess,
  readInscriptionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionEventReadContainer)
