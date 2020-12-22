/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import _ from 'lodash'

import PetitionCreate from '../../components/petition/PetitionCreate'
import { clearErrors } from '../../store/actions/error'
import { readInscriptionEvent } from '../../store/actions/inscriptionEvent'
import { readCalendar } from '../../store/actions/calendar'
import { readListVacancy } from '../../store/actions/vacancy'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { createInscription } from '../../store/actions/inscription'
import { convertVacanciesToOptions } from '../../utils/vacancyHelpers'
import { selectVacancyByInscriptionEventId } from '../../store/selectors/vacancy/vacancy'
import { getEmptyKeys, removeEmptyKeys, isEmpty } from '../../utils/objectHelpers'
import { validateVacancyId, validateBody } from '../../validation/inscription'
import { checkNested } from '../../utils/objectHelpers'
import { selectPetitionEventById_noMemo } from '../../store/selectors/petitionEvent/selectPetitionEventById_noMemo'
import { selectCallByPetitionEventId_noMemo } from '../../store/selectors/call/selectCallByPetitionEventId_noMemo'
import { selectProcessByPetitionEventId_noMemo } from '../../store/selectors/process/selectProcessByPetitionEventId_noMemo'
import { readPetitionEvent } from '../../store/actions/petitionEvent'

import { getProcessById } from '../../store/selectors/teste/getProcess'
import { getCallById } from '../../store/selectors/teste/getCall'
import { getPetitionEventById } from '../../store/selectors/teste/getPetitionEvent'
import { convertInscriptionsToOptions } from '../../utils/inscriptionHelpers'

const InscriptionCreateOnInscriptionEventContainer = props => {
  const query = qs.parse(props.location.search)
  const petitionEvent_id = query.petitionEvent_id || null
  const { vacancies, profilePerson, errorStore, petitionEventV2 } = props
  const {
    clearErrors,
    readInscriptionEvent,
    readCalendar,
    readListVacancy,
    readCall,
    getProcess,
    createInscription,
    readPetitionEvent
  } = props
  const { history } = props

  const initialCreateData = {
    petitionEvent_id: petitionEvent_id,
    inscription_id: '',
    title: '',
    description: ''
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  //criar userInscription options
  const userInscriptions = checkNested(petitionEventV2, 'inscriptionEvent', 'myInscriptions')
    ? petitionEventV2.inscriptionEvent.myInscriptions
    : []
  const userInscriptionOptions = convertInscriptionsToOptions(userInscriptions)
  userInscriptionOptions.unshift({ label: 'Selecione a inscrição', value: '' })

  const vacancyOptions = convertVacanciesToOptions(vacancies)
  vacancyOptions.unshift({ label: 'Sem vaga selecionada', value: '' })

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    //get petitionEvent
    readPetitionEvent(petitionEvent_id, {
      callbackOk: ptE => {
        //get Calendar
        readCalendar(ptE.calendar_id, {
          callbackOk: cld => {
            readCall(cld.call_id, {
              callbackOk: call => {
                getProcess(call.selectiveProcess_id, {})
              }
            })
          }
        })

        //get inscriptionEvent and inscription
        readInscriptionEvent(ptE.inscriptionEvent_id, {
          withInscription: {
            ownerOnly: true,
            withVacancy: true,
            withAssignment: true,
            withRegion: true,
            withRestriction: true
          }
        })
      }
    })
  }, [])

  //Load person_id when have profileData
  useEffect(
    () => {
      if (!isEmpty(profilePerson)) {
        setCreateData({ ...createData, person_id: profilePerson.id })
      }
    },
    [profilePerson]
  )

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
      case 'vacancy_id':
        errorList[e.target.name] = validateVacancyId(e.target.value, 'create')
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

  //onSubmit
  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(createData, 'create')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...createData
      }

      createInscription(data, {
        callbackOk: inscription => {
          history.push(`/inscription-event/read/${inscription.inscriptionEvent_id}`)
        }
      })
    }
  }

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    createData: createData,
    vacancyOptions: vacancyOptions,
    userInscriptionOptions: userInscriptionOptions,
    errors: errors,
    onChange: onChange,
    onSubmit: onSubmit
  }

  console.log(petitionEventV2)
  console.log(userInscriptionOptions)

  return <PetitionCreate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search)
  const petitionEvent_id = query.petitionEvent_id || null

  return {
    petitionEventV2: getPetitionEventById(state, petitionEvent_id, {
      withCalendar: {
        withCall: {
          withProcess: true
        }
      },
      withInscriptionEvent: {
        withMyInscription: { withVacancy: { withAssignment: true, withRegion: true, withRestriction: true } }
      }
    }),

    petitionEvent: selectPetitionEventById_noMemo(state, petitionEvent_id, {}),

    profileLoading: state.profileStore.loading,
    profilePerson: checkNested(state, 'profileStore', 'profile') ? state.profileStore.profile.Person : {},
    profileStore: state.profileStore,
    vacancies: selectVacancyByInscriptionEventId(state, petitionEvent_id, {
      withAssignment: true,
      withRegion: true,
      withRestriction: true
    }),
    calendar: {},
    call: selectCallByPetitionEventId_noMemo(state, petitionEvent_id, {}),
    process: selectProcessByPetitionEventId_noMemo(state, petitionEvent_id, {}),
    errorStore: state.errorStore
  }
}

const mapActionsToProps = {
  clearErrors,
  readInscriptionEvent,
  readCalendar,
  readListVacancy,
  readCall,
  getProcess,
  createInscription,
  readPetitionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionCreateOnInscriptionEventContainer)
