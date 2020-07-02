/** @format */

import { createSelector } from 'reselect'

import { selectPerson } from './person'

export const makeSelectPersonById = () => {
  const getStore = store => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options

  return createSelector(
    [selectPerson, getStore, getId, getOptions],
    (people, store, id, options) => {
      let person = people.find(ie => ie.id === id)

      return person ? person : null
    }
  )
}

//single instance of selectPersonById
export const selectPersonById = makeSelectPersonById()
