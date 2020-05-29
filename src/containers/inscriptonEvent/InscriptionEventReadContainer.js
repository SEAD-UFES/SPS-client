/** @format */

import React from 'react'

import InscriptionEventRead from '../../components/inscriptionEvent/InscriptionEventRead'

const InscriptionEventReadContainer = props => {
  const allProps = {
    ...props
  }

  return <InscriptionEventRead {...allProps} />
}

export default InscriptionEventReadContainer
