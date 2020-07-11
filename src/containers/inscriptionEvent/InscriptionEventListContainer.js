/** @format */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'

import InscriptionEventList from '../../components/inscriptionEvent/InscriptionEventList'
import { clearErrors } from '../../store/actions/error'
import { readListInscriptionEvent } from '../../store/actions/inscriptionEvent'

const InscriptionEventListContainer = props => {
  const query = qs.parse(props.location.search)
  const call_id = query.call_id || null
  const { readListInscriptionEvent } = props

  //componentDidMount
  useEffect(() => {
    clearErrors()
    readListInscriptionEvent({ call_id: call_id })
  }, [])

  //baixar dados do servidor.

  const allProps = {
    ...props
  }

  return <InscriptionEventList {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapActionsToProps = {
  readListInscriptionEvent
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(InscriptionEventListContainer)
