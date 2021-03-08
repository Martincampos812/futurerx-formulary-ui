import { PrescriberAddressModel } from "../models/prescriber/prescriber-address.model";
import {PharmacyAddressModel} from "../models/pharmacyprofile/pharmacyprofile-address.model";

const timeData = [{ day: 'Mon', time: '9 AM - 5 PM EST' },
{ day: 'Tue', time: '9 AM - 5 PM EST' },
{ day: 'Wed', time: '9 AM - 5 PM EST' },
{ day: 'Thu', time: '9 AM - 7 PM EST' },
{ day: 'Fri', time: '9 AM - 7 PM EST' },
{ day: 'Sat', time: '9 AM - 12 PM EST' },
{ day: 'Sun', time: 'Closed' }]

export const getPrescriberAddress:() => PrescriberAddressModel = () => {
	let prescriberAddress = {
		primary:{
			type: "Prescriber",
			address: '5357 Southwick Dr. Tampa, FL 33624',
			phone: '(813) 269-2814',
			fax: '(813) 269-2814',
			email:"james.sullivan@dsmedgroup.com",
			workingHours: timeData,
			county:"Multnomah",
			country:"United States",
			languages:["French", "Spanish"]
		},
		secondary: {
			type: "Prescriber",
			address: '921 SW Washington St. Portland, OR 97205 Suite 807',
			phone: '(813) 269-2814',
			fax: '(813) 269-2814',
			email:"james.sullivan@dsmedgroup.com",
			workingHours: timeData,
			county:"Multnomah",
			country:"United States",
			languages:["French", "Spanish"]
		}
					

	
}
return prescriberAddress
}

// pharmacy profile address mock //
export const getPharmacyAddress:() => PharmacyAddressModel = () => {
	let pharmacyAddress = {
		primary:{
			type: "Pharmacy",
			address: '921 SW Washington St. Portland, OR 97205 Suite 807',
			phone: '+1 219 524 5166',
			fax: '+1 219 524 5166',
			email:"james.sullivan@dsmedgroup.com",
			workingHours: timeData,
			county:"Multnomah",
			country:"United States",
			languages:["French", "Spanish"]	
		}	
	}
return pharmacyAddress
}