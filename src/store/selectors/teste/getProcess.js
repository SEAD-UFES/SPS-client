/** @format */

import { getManyCallByProcessId } from './getManyCallByProcessId'

export const getProcessById = (store, id, options = {}) => {
  console.log('pegando process')
  //find process
  const ProcessStore = store.processStore
  const process = ProcessStore.process ? ProcessStore.process : null //porque o formato do store é antigo
  const newProcess = process ? { ...process } : null

  //get child call
  if (newProcess && options.withCall) {
    const opt_call = typeof options.withCall === 'object' ? options.withCall : {}
    newProcess.calls = getManyCallByProcessId(store, newProcess.id, opt_call)
  }

  //return process
  return newProcess
}
