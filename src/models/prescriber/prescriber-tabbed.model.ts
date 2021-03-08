export interface PrescriberTabDemographyModel {
    type: string;
    providerId: string;
    birthDate: string;
    deceasedDate: string;
    relationShipId: string;
    npi: string;
    upin: string;
    taxId: string;
    medicaidId: string;
    renewalDate: string;
    deaNumber: string;
    drugSchedule: string;
}
  
export interface PrescriberTabSpecilaityModel {
  primarySpeciality: Taxonomy;
  secondarySpeciality: Taxonomy;
}
  
export interface Taxonomy {
  taxonomyCode: string;
  taxonomyDescription: string;
}

export interface PrescriberTabLicensureModel {
  expirationDate: string;
  licenseNumber: string;
  licenseDate: string;
}