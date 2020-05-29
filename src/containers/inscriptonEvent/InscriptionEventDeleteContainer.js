/** @format */

import React from 'react'

import InscriptionEventDelete from '../../components/inscriptionEvent/InscriptionEventDelete'

const InscriptionEventDeleteContainer = props => {
  const allProps = {
    ...props
  }

  return <InscriptionEventDelete {...allProps} />
}

export default InscriptionEventDeleteContainer
