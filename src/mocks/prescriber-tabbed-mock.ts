import { PrescriberTabDemographyModel, PrescriberTabSpecilaityModel, PrescriberTabLicensureModel } from "../models/prescriber/prescriber-tabbed.model";
import { PharmacyTabDemographyModel, PharmacyTabSpecilaityModel, PharmacyTabLicensureModel } from "../models/pharmacyprofile/pharmacyprofile-tabbed.model";

export const getPrescriberTabDemography:() => PrescriberTabDemographyModel = () => {
	let prescriberTabDemography = {
        type: "Prescriber",
        providerId:"HD0364FPK6",
        birthDate: "MM/DD/YYY",
        deceasedDate: "N/A",
        relationShipId: "123456789",
        npi: "123456789",
        upin: "FF123568811",
        taxId: "HD0364FPK6",
        medicaidId: "123456789",
        renewalDate: "MM/DD/YYY",
        deaNumber: "FF123568811",
        drugSchedule: "HD0364FPK6",
    }
return prescriberTabDemography
}


export const getPrescriberTabSpeciality:() => PrescriberTabSpecilaityModel = () => {
	let prescriberTabSpeciality = {
	primarySpeciality:{
        taxonomyCode:"363LA2200X",
        taxonomyDescription:"Physician Assistants & Advanced Practice Nursing Pharmacys - Nurse Practitioner - Adult Health"
	},
	secondarySpeciality: {
        taxonomyCode:"363LA2200X",
        taxonomyDescription:"Physician Assistants & Advanced Practice Nursing Pharmacys - Nurse Practitioner - Adult Health"
	}
}
return prescriberTabSpeciality
}

export const getPrescriberTabLicensure:() => PrescriberTabLicensureModel = () => {
	let prescriberTabLicensure = {
        expirationDate: "03/21/2022",
        licenseNumber: "J7808",
        licenseDate: "TX",
    }
return prescriberTabLicensure
}


// pharmacy tab data //

export const getPharmacyTabDemography:() => PharmacyTabDemographyModel = () => {
	let pharmacyTabDemography = {
        type: "Pharmacy",
        pharmacyNcpdp:"HD0364FPK6",
        relationShipId: "123456789",
        npi: "123456789",
        taxId: "HD0364FPK6",
        medicaidId: "123456789",
        renewalDate: "MM/DD/YYY",
        deaNumber: "FF123568811",
    }
return pharmacyTabDemography
}


export const getPharmacyTabSpeciality:() => PharmacyTabSpecilaityModel = () => {
	let pharmacyTabSpeciality = {
	primarySpeciality:{
        taxonomyCode:"363LA2200X",
        taxonomyDescription:"Physician Assistants & Advanced Practice Nursing Pharmacys - Nurse Practitioner - Adult Health"
	},
	secondarySpeciality: {
        taxonomyCode:"363LA2200X",
        taxonomyDescription:"Physician Assistants & Advanced Practice Nursing Pharmacys - Nurse Practitioner - Adult Health"
	}
}
return pharmacyTabSpeciality
}

export const getPharmacyTabLicensure:() => PharmacyTabLicensureModel = () => {
	let pharmacyTabLicensure = {
        expirationDate: "03/21/2022",
        licenseNumber: "J7808",
        licenseDate: "TX",
    }
return pharmacyTabLicensure
}


