/** @format */

export const getPersonById = (store, id, options = {}) => {
  console.log('pegando person')
  //find vacancy
  const PersonStore = store.personStore
  const people = PersonStore.allIds.map(id => ({ ...PersonStore.byId[id] }))
  const person = people.find(per => per.id === id)
  const newPerson = person ? { ...person } : null

  return newPerson
}
