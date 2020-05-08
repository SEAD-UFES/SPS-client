/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clearErrors } from '../../store/actions/error'
import { readCallV2 } from '../../store/actions/call'
import { getProcess } from '../../store/actions/process'
import { listAssignment } from '../../store/actions/assignment'
import { listRegion } from '../../store/actions/region'
import { listRestriction } from '../../store/actions/restriction'
import { readVacancyV2, updateVacancy } from '../../store/actions/vacancy'

import VacancyUpdate from '../../components/vacancyV2/VacancyUpdate'
import { convertObjetsToOptions } from '../../utils/selectorHelpers'
import { getEmptyKeys, removeEmptyKeys, isEmpty, checkNested } from '../../utils/objectHelpers'
import { validateAssignmentId, validateQtd, validateReserve, validateBody } from '../../validation/vacancy'

import { selectAssignment } from '../../store/selectors/assignment'
import { selectRestriction } from '../../store/selectors/restriction'
import { selectRegion } from '../../store/selectors/region'
import { selectVacancyById } from '../../store/selectors/vacancy'
import { selectCallByVacancyId } from '../../store/selectors/call'
import { selectProcessByVacancyId } from '../../store/selectors/process'

const VacancyUpdateContainer = props => {
  const id = props.match.params.id
  const {
    clearErrors,
    listAssignment,
    listRegion,
    listRestriction,
    readCallV2,
    getProcess,
    readVacancyV2,
    updateVacancy,
    errorStore
  } = props
  const { vacancy, vacancyLoading, assignments, regions, restrictions } = props

  const initialUpdateData = {
    call_id: '',
    assignment_id: '',
    qtd: '',
    region_id: '',
    restriction_id: '',
    reserve: true
  }
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [readyToLoad, setReadyToLoad] = useState(false)
  const [errors, setErrors] = useState({})

  const assignmentOptions = convertObjetsToOptions(assignments)
  assignmentOptions.unshift({ label: 'Escolha o cargo', value: '' })

  const regionOptions = convertObjetsToOptions(regions)
  regionOptions.unshift({ label: 'Escolha a região', value: '' })

  const restrictionOptions = convertObjetsToOptions(restrictions)
  restrictionOptions.unshift({ label: 'Escolha a restrição', value: '' })

  //ComponentDidMount
  useEffect(() => {
    clearErrors()
    listAssignment()
    listRegion()
    listRestriction()
    readVacancyV2(id, {
      callbackOk: vac => {
        readCallV2(vac.call_id, {
          callbackOk: call => {
            getProcess(call.selectiveProcess_id)
          }
        })
      }
    })
  }, [])

  //Check if have the data to put on form
  useEffect(
    () => {
      if (vacancy && vacancyLoading === false) setReadyToLoad(true)
    },
    [vacancy, vacancyLoading]
  )

  //load Data on form
  useEffect(
    () => {
      if (readyToLoad) {
        setUpdateData({
          call_id: vacancy.call_id,
          assignment_id: vacancy.assignment_id,
          qtd: vacancy.qtd,
          region_id: vacancy.region_id ? vacancy.region_id : '',
          restriction_id: vacancy.restriction_id ? vacancy.restriction_id : '',
          reserve: vacancy.reserve
        })
      }
    },
    [readyToLoad]
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
      case 'assignment_id':
        errorList[e.target.name] = validateAssignmentId(e.target.value, 'update')
        break
      case 'qtd':
        errorList[e.target.name] = validateQtd(e.target.value, 'update')
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

    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    setErrors(newErrors)
  }

  const onCheck = e => {
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'reserve':
        errorList[e.target.name] = validateReserve(e.target.value, 'update')
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

    setUpdateData({ ...updateData, [e.target.name]: !updateData[e.target.name] })
    setErrors(newErrors)
  }

  const onSubmit = e => {
    e.preventDefault()
    const submitErrors = validateBody(updateData, 'update')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...updateData,
        region_id: updateData.region_id ? updateData.region_id : null,
        restriction_id: updateData.restriction_id ? updateData.restriction_id : null
      }

      updateVacancy(vacancy.id, data, {
        callbackOk: vac => {
          props.history.push(`/call/read/${vac.call_id}`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    assignmentOptions: assignmentOptions,
    regionOptions: regionOptions,
    restrictionOptions: restrictionOptions,
    updateData: updateData,
    errors: errors,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit
  }

  return <VacancyUpdate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const vacancy_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    assignments: selectAssignment(state),
    regions: selectRegion(state),
    restrictions: selectRestriction(state),
    vacancy: selectVacancyById(state, vacancy_id, {}),
    vacancyLoading: state.vacancyStoreV2.loading,
    call: selectCallByVacancyId(state, vacancy_id, {}),
    process: selectProcessByVacancyId(state, vacancy_id, {})
  }
}

const mapActionsToProps = {
  clearErrors,
  listAssignment,
  listRegion,
  listRestriction,
  readVacancyV2,
  readCallV2,
  getProcess,
  updateVacancy
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VacancyUpdateContainer)
