/** @format */

import React from 'react'

import InscriptionEventUpdate from '../../components/inscriptionEvent/InscriptionEventUpdate'

const InscriptionEventUpdateContainer = props => {
  const allProps = {
    ...props
  }

  return <InscriptionEventUpdate {...allProps} />
}

export default InscriptionEventUpdateContainer
