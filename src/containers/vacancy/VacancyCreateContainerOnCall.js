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
import VacancyCreateOnCall from '../../components/vacancyV2/VacancyCreateOnCall'
import { selectCallById, selectProcessByCallId } from '../../store/selectors/call'
import { convertObjetsToOptions } from '../../utils/selectorHelpers'
import { selectAssignment } from '../../store/selectors/assignment'
import { selectRestriction } from '../../store/selectors/restriction'
import { selectRegion } from '../../store/selectors/region'

const VacancyCreateContainerOnCall = props => {
  const id = props.match.params.id
  const { clearErrors, listAssignment, listRegion, listRestriction, readCallV2, getProcess } = props
  const { assignments, regions, restrictions } = props

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

  //onChange
  const onChange = e => {
    e.preventDefault()
  }

  const allProps = {
    ...props,
    createData: createData,
    assignmentOptions: assignmentOptions,
    regionOptions: regionOptions,
    restrictionOptions: restrictionOptions
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
  getProcess
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VacancyCreateContainerOnCall)
