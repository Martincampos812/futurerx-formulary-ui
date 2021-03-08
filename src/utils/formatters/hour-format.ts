export const convertFrom24To12Format = (time) => {
    let splits = time ? time.split(' '):[]
    let hour = splits.length > 0 ? splits[0]:""
    let part = splits.length > 1 ? splits[1]:""
    hour = hour > 12 ? hour - 12 : hour;
    return hour + ' ' + part;
}

export const leadingZeroRemove = (numString) => {
    // return parseInt(numString, 10);
    while (numString.substr(0,1) == '0' && numString.length>1) { numString = numString.substr(1,9999); }
    return numString;
}