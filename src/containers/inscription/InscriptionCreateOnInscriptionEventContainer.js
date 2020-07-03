/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import InscriptionCreateOnInscriptionEvent from '../../components/inscription/InscriptionCreateOnInscriptionEvent'
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
import { selectInscriptionEventById } from '../../store/selectors/inscriptionEvent/selectInscriptionEventById'
import { selectCallByInscriptionEventId } from '../../store/selectors/call/call'
import { selectProcessByInscriptionEventId } from '../../store/selectors/process/process'

const InscriptionCreateOnInscriptionEventContainer = props => {
  const id = props.match.params.id
  const { vacancies, profilePerson, errorStore } = props
  const {
    clearErrors,
    readInscriptionEvent,
    readCalendar,
    readListVacancy,
    readCall,
    getProcess,
    createInscription
  } = props
  const { history } = props

  const initialCreateData = {
    inscriptionEvent_id: id,
    person_id: '',
    vacancy_id: ''
  }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})

  const vacancyOptions = convertVacanciesToOptions(vacancies)
  vacancyOptions.unshift({ label: 'Sem vaga selecionada', value: '' })

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    //get InscriptionEvent
    readInscriptionEvent(id, {
      callbackOk: iEvent => {
        //get Calendar
        readCalendar(iEvent.calendar_id, {
          callbackOk: cld => {
            //get vacancies
            readListVacancy({ call_ids: [cld.call_id], withAssignment: true, withRegion: true, withRestriction: true })
            //get Call
            readCall(cld.call_id, {
              callbackOk: call => {
                //get Process
                getProcess(call.selectiveProcess_id, {})
              }
            })
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
      console.log(submitErrors)
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
    errors: errors,
    onChange: onChange,
    onSubmit: onSubmit
  }

  return <InscriptionCreateOnInscriptionEvent {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const iEvent_id = ownProps.match.params.id

  return {
    profileLoading: state.profileStore.loading,
    profilePerson: checkNested(state, 'profileStore', 'profile') ? state.profileStore.profile.Person : {},
    vacancies: selectVacancyByInscriptionEventId(state, iEvent_id, {
      withAssignment: true,
      withRegion: true,
      withRestriction: true
    }),
    inscriptionEvent: selectInscriptionEventById(state, iEvent_id, {}),
    call: selectCallByInscriptionEventId(state, iEvent_id, {}),
    process: selectProcessByInscriptionEventId(state, iEvent_id, {}),
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
  createInscription
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionCreateOnInscriptionEventContainer)
