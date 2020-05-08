/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clearErrors } from '../../store/actions/error'
import { readCallV2 } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { readVacancyV2, deleteVacancy } from '../../store/actions/vacancy'
import VacancyDelete from '../../components/vacancyV2/VacancyDelete'
import { selectVacancyById } from '../../store/selectors/vacancy'
import { selectCallByVacancyId } from '../../store/selectors/call'
import { selectProcessByVacancyId } from '../../store/selectors/process'

const VacancyDeleteContainer = props => {
  const id = props.match.params.id
  const { call, vacancy } = props
  const { clearErrors, readCallV2, getProcess, readVacancyV2, deleteVacancy } = props
  const [errors, setErrors] = useState({})

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    readVacancyV2(id, {
      withAssignment: true,
      withRegion: true,
      withRestriction: true,
      callbackOk: vac => {
        readCallV2(vac.call_id, {
          callbackOk: call => {
            getProcess(call.selectiveProcess_id)
          }
        })
      }
    })
  }, [])

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
  readVacancyV2,
  readCallV2,
  getProcess,
  deleteVacancy
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VacancyDeleteContainer)