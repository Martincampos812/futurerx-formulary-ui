
// to format phone number to us standards
//example:
// console.log(formatPhoneNumber('+12345678911')) // => "+1 (234) 567-8911"
// console.log(formatPhoneNumber('4355678767'))   // => "(435) 567-8767"
export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

export const formatFaxNumber = (faxNumberString) => {
  var cleaned = ('' + faxNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

export const getPhoneNumberFromData = (formattedPhoneString) => {
	
  // var matches = formattedPhoneString.match(/(\d+)/); 
	// if (matches && matches.length > 0) { 
	// 		return matches[0]; 
	// } else {
	// 	return formattedPhoneString
  // }

  // changing US format to normal number format
  return formattedPhoneString.replace(/[\(\)\-\s]+/g, '')
}

console.log("getPhoneNumberFromData", getPhoneNumberFromData("(345) 909-45333"))



const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
// for number //
export const normalizeInputFormatPhone = (value) => {
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  
  if (value) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  }
};


// for string //
export const normalizeInputFormatPhoneString = (value) => {
  const currentValue = value.toString().replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  
  if (value) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  }
};
