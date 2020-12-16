/** @format */

//import { selectCallByPetitionEventId_noMeno } from '../call/selectCallByPetitionEventId_noMemo'

export const selectProcessByPetitionEventId_noMemo = (store, petitionEvent_id, options = {}) => {
  // get call (não usado por hora, porque o store é antigo)
  //   const call = selectCallByPetitionEventId_noMeno(store, petitionEvent_id, options)
  //   const process_id = call ? call.selectiveProcess_id : null

  //find process
  const ProcessStore = store.processStore
  const process = ProcessStore.process ? ProcessStore.process : null //porque o formato do store é antigo
  const newProcess = process ? { ...process } : null

  return newProcess
}
