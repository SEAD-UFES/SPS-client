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
import { createVacancy } from '../../store/actions/vacancy'
import VacancyCreateOnCall from '../../components/vacancyV2/VacancyCreateOnCall'
import { selectCallById, selectProcessByCallId } from '../../store/selectors/call'
import { convertObjetsToOptions } from '../../utils/selectorHelpers'
import { selectAssignment } from '../../store/selectors/assignment'
import { selectRestriction } from '../../store/selectors/restriction'
import { selectRegion } from '../../store/selectors/region'
import { getEmptyKeys, removeEmptyKeys, isEmpty, checkNested } from '../../utils/objectHelpers'
import { validateAssignmentId, validateQtd, validateReserve, validateBody } from '../../validation/vacancy'

const VacancyCreateContainerOnCall = props => {
  const id = props.match.params.id
  const { clearErrors, listAssignment, listRegion, listRestriction, readCallV2, getProcess, createVacancy } = props
  const { assignments, regions, restrictions, errorStore } = props

  const initialCreateData = {
    call_id: id,
    assignment_id: '',
    qtd: '',
    region_id: '',
    restriction_id: '',
    reserve: true
  }
  const [createData, setCreateData] = useState(initialCreateData)
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
    readCallV2(id, {
      callbackOk: call => {
        getProcess(call.selectiveProcess_id)
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
      case 'assignment_id':
        errorList[e.target.name] = validateAssignmentId(e.target.value, 'create')
        break
      case 'qtd':
        errorList[e.target.name] = validateQtd(e.target.value, 'create')
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

  const onCheck = e => {
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'reserve':
        errorList[e.target.name] = validateReserve(e.target.value, 'create')
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

    setCreateData({ ...createData, [e.target.name]: !createData[e.target.name] })
    setErrors(newErrors)
  }

  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(createData, 'create')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      const data = {
        ...createData,
        region_id: createData.region_id ? createData.region_id : null,
        restriction_id: createData.restriction_id ? createData.restriction_id : null
      }

      createVacancy(data, {
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
    createData: createData,
    errors: errors,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit
  }

  return <VacancyCreateOnCall {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  const call_id = ownProps.match.params.id

  return {
    errorStore: state.errorStore,
    assignments: selectAssignment(state),
    regions: selectRegion(state),
    restrictions: selectRestriction(state),
    call: selectCallById(state, call_id, {}),
    callLoading: state.callStoreV2.loading,
    process: selectProcessByCallId(state, call_id, { withCourse: true })
  }
}

const mapActionsToProps = {
  clearErrors,
  listAssignment,
  listRegion,
  listRestriction,
  readCallV2,
  getProcess,
  createVacancy
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VacancyCreateContainerOnCall)
