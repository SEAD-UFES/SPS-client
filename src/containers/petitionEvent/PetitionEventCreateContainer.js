/** @format */

import React from 'react'
import { connect } from 'react-redux'

import PetitionEventCreate from '../../components/petitionEvent/PetitionEventCreate'

const PetitionEventCreateContainer = props => {
  //make props bundle to ViewComponent
  const allProps = { ...props }

  return <PetitionEventCreate {...allProps} />
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapActionsToProps = {}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PetitionEventCreateContainer)
