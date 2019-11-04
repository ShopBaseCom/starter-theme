let config = {
  containerElement: null,
  conPack: 'mdi',
  iconComponent: null,
  dialogConfirmText: null,
  dialogCancelText: null,
  snackbarDuration: 3500,
  toastDuration: 4000,
  toastPosition: 'bottom',
  tooltipType: 'primary',
  tooltipAnimated: false,
  inputAutocomplete: 'on',
  dateFormatter: null,
  dateParser: null,
  dateCreator: null,
  dayNames: null,
  monthNames: null,
  firstDayOfWeek: null,
  unselectableDaysOfWeek: null,
  timeFormatter: null,
  timeParser: null,
  modalCanCancel: null,
  modalScroll: null,
  datepickerMobileNative: true,
  timepickerMobileNative: true,
  noticeQueue: true,
  inputHasCounter: true,
  useHtml5Validation: true,
}

export const setConfig = (newConfig) => {
  config = newConfig
}

export default config
