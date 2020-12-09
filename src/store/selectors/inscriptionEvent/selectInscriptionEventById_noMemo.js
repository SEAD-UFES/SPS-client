/** @format */

export const selectInscriptionEventById_noMemo = (store, inscriptionEvent_id, options) => {
  const IEstore = store.inscriptionEventStore
  const inscriptionEvents = IEstore.allIds.map(id => ({ ...IEstore.byId[id] }))
  const inscriptionEvent = inscriptionEvents.find(IE => IE.id === inscriptionEvent_id)
  const newInscriptionEvent = inscriptionEvent ? { ...inscriptionEvent } : null

  //inserir calendar se solicitado.
  if (options.withCalendar) {
    console.log('vou tentar inserir o calendar')
  }

  return newInscriptionEvent
}
