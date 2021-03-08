export const getTop5FilledDrugsNumbers = (): Array<number> => {
  return top5FilledDrugsNumbers;
}
export const getTop5FilledDrugsLabels = ():Array<string> => {
  return top5FilledDrugsLabels;
}


export const getAuthorizationNumbers = (): Array<number> => {
  return AuthorizationNumbers;
}

export const getAuthorizationLabels = ():Array<string> => {
  return AuthorizationLabels;
}


export const getOverrideNumbers = (): Array<number> => {
  return OverrideNumbers;
}

export const getOverrideLabels = ():Array<string> => {
  return OverrideLabels;
}

export const getMemberNumbers = (): Array<number> => {
  return MemberNumbers;
}

export const getMemberLabels = ():Array<string> => {
  return MemberLabels;
}

export const getProviderNumbers = (): Array<number> => {
  return ProviderNumbers;
}

export const getProviderLabels = ():Array<string> => {
  return ProviderLabels;
}

export const getPharmacyNumbers = (): Array<number> => {
  return PharmacyNumbers;
}

export const getPharmacyLabels = ():Array<string> => {
  return PharmacyLabels;
}

export const getOtherNumbers = (): Array<number> => {
  return OtherNumbers;
}

export const getOtherLabels = ():Array<string> => {
  return OtherLabels;
}

export const getTotalNumbers = (): Array<number> => {
  return TotalNumbers;
}

export const getTotalLabels = ():Array<string> => {
  return TotalLabels;
}


// These two arrays should have the same length
const top5FilledDrugsNumbers = [15, 11, 9, 3, 1];
const top5FilledDrugsLabels = [
  "Simvastatin", "Hydrocodone-Acetaminophen", "Omeprazole",
  "Atorvastatin cal...", "Furosemide"
];

const AuthorizationNumbers = [1, 3];
const AuthorizationLabels = [
  "AUG-2020", 'YTD'
]
const OverrideNumbers = [1, 1];
const OverrideLabels = [
  "AUG-2020", 'YTD'
]

const MemberNumbers = [1, 3];
const MemberLabels = [
  "AUG-2020", 'YTD'
]
const ProviderNumbers = [1, 5];
const ProviderLabels = [
  "AUG-2020", 'YTD'
]

const PharmacyNumbers = [3, 1];
const PharmacyLabels = [
  "AUG-2020", 'YTD'
]
const OtherNumbers = [1, 2];
const OtherLabels = [
  "AUG-2020", 'YTD'
]

const TotalNumbers = [5, 11];
const TotalLabels = [
  "AUG-2020", 'YTD'
]