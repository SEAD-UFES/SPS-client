/** @format */

import React from 'react'

import CalendarRead from '../../components/calendar/CalendarRead'

const CalendarReadContainer = props => {
  const allProps = {
    ...props
  }

  return <CalendarRead {...allProps} />
}

export default CalendarReadContainer
