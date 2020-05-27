/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { readCall } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { readVacancy, deleteVacancy } from '../../store/actions/vacancy'
import VacancyDelete from '../../components/vacancy/VacancyDelete'
import { selectVacancyById } from '../../store/selectors/vacancy'
import { selectCallByVacancyId } from '../../store/selectors/call'
import { selectProcessByVacancyId } from '../../store/selectors/process'
import { checkNested } from '../../utils/objectHelpers'

const VacancyDeleteContainer = props => {
  const id = props.match.params.id
  const { call, vacancy, errorStore } = props
  const { clearErrors, readCall, getProcess, readVacancy, deleteVacancy } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readVacancy(id, {
      withAssignment: true,
      withRegion: true,
      withRestriction: true,
      callbackOk: vac => {
        readCall(vac.call_id, {
          callbackOk: call => {
            getProcess(call.selectiveProcess_id)
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

    deleteVacancy(vacancy.id, {
      callbackOk: () => {
        props.history.push(`/call/read/${call.id}`)
      }
    })
  }

  //allProps
  const allProps = {
    ...props,
    errors: errors,
    onSubmit: onSubmit
  }

  //render
  return <VacancyDelete {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const vacancy_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    vacancy: selectVacancyById(state, vacancy_id, { withAssignment: true, withRegion: true, withRestriction: true }),
    call: selectCallByVacancyId(state, vacancy_id, {}),
    process: selectProcessByVacancyId(state, vacancy_id, {})
  }
}

const mapActionsToProps = {
  clearErrors,
  readVacancy,
  readCall,
  getProcess,
  deleteVacancy
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VacancyDeleteContainer)
