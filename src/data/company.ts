export const company = {
  name: 'VÉRÉN',
  founded: 2008,
  foundedIn: 'Dubai',
  developments: 12,
  deliveredDevelopments: 9,
  developmentsInProgress: 3,
  homesHandedOver: 2140,
  developedArea: '1.8M sq ft',
  destinations: 8,
  handoversOnOrBeforePromisedDate: 9,
  promisedHandovers: 9,
  averageEarlyDeliveryDays: 38,
  firstYearDefectsPer100Homes: 4,
} as const

export const metrics = [
  { value: '9 of 9', label: 'Handovers on time' },
  { value: '2,140', label: 'Homes handed over' },
  { value: '38 days', label: 'Average early delivery' },
] as const
