export interface PharmacyTabDemographyModel {
    type: string;
    pharmacyNcpdp: string;
    relationShipId: string;
    npi: string;
    taxId: string;
    medicaidId: string;
    renewalDate: string;
    deaNumber: string;
}
  
export interface  PharmacyTabSpecilaityModel {
  primarySpeciality: Taxonomy;
  secondarySpeciality: Taxonomy;
}
  
export interface Taxonomy {
  taxonomyCode: string;
  taxonomyDescription: string;
}

export interface  PharmacyTabLicensureModel {
  expirationDate: string;
  licenseNumber: string;
  licenseDate: string;
}