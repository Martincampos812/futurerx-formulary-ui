// import ProfilePhoto from "../assets/icons/images/PrescriberProfilePhoto.png"
// let imageUrl = require("../assets/icons/images/PrescriberProfilePhoto.png");
import { PrescriberMemberNameInfoModel } from "../models/prescriber/prescriber-name.model";
import { PharmacyMemberNameInfoModel } from "../models/pharmacyprofile/pharmacyprofile-name.model";

export const getPrescriberMemberName:() => PrescriberMemberNameInfoModel = () => {
	let prescriberName = {
        type: "Prescriber",
        name: "James Sullivan, MD",
        age: "52",
        gender: 'Male',
        specialist: 'Clinical Nurse Specialist: Gerontology',
        activity:'Active',
        dates : [
            '01/01/2020 - 12/31/2020',
            '01/01/2019 - 12/31/2019',
            '01/01/2018 - 12/31/2018'
            ]
        }
return prescriberName
}

export const getPharmacyMemberName:() => PharmacyMemberNameInfoModel = () => {
	let pharmacyName = {
        type: "Pharmacy",
        name: "Walgreens Pharmacy",
        specialist: 'Clinical Nurse Specialist: Gerontology',
        activity:'Active',
        dates : [
            '01/01/2020 - 12/31/2020',
            '01/01/2019 - 12/31/2019',
            '01/01/2018 - 12/31/2018'
            ]
        }
return pharmacyName
}

// export const dates = [
// '01/01/2020 - 12/31/2020',
// '01/01/2019 - 12/31/2019',
// '01/01/2018 - 12/31/2018'
// ];