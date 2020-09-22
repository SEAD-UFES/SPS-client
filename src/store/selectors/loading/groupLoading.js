/** @format */

export const selectGroupLoading = (store, options = {}) => {
  let isLoading = false

  if (options.withSelectiveProcess) {
    isLoading = isLoading || store.selectiveProcessStore.loading
  }

  if (options.withCall) {
    isLoading = isLoading || store.callStore.loading
  }

  if (options.withCalendar) {
    isLoading = isLoading || store.calendarStore.loading
  }

  if (options.withInscriptionEvent) {
    isLoading = isLoading || store.inscriptionEventStore.loading
  }

  return isLoading
}
