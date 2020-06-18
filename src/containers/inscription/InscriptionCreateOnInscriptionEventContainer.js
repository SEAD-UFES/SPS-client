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
import { convertVacanciesToOptions } from '../../utils/vacancyHelpers'
import { selectVacancyByInscriptionEventId } from '../../store/selectors/vacancy'
import { getEmptyKeys, removeEmptyKeys, isEmpty } from '../../utils/objectHelpers'

const InscriptionCreateOnInscriptionEventContainer = props => {
  const id = props.match.params.id
  const { vacancies } = props
  const { clearErrors, readInscriptionEvent, readCalendar, readListVacancy, readCall, getProcess } = props

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

  //onChange
  const onChange = e => {
    e.preventDefault()
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'vacancy_id':
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

  //make props bundle to ViewComponent
  const allProps = {
    ...props,
    createData: createData,
    vacancyOptions: vacancyOptions,
    errors: errors,
    onChange: onChange
  }

  return <InscriptionCreateOnInscriptionEvent {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const iEvent_id = ownProps.match.params.id

  return {
    vacancies: selectVacancyByInscriptionEventId(state, iEvent_id, {
      withAssignment: true,
      withRegion: true,
      withRestriction: true
    }),
    errorStore: state.errorStore
  }
}

const mapActionsToProps = {
  clearErrors,
  readInscriptionEvent,
  readCalendar,
  readListVacancy,
  readCall,
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionCreateOnInscriptionEventContainer)
