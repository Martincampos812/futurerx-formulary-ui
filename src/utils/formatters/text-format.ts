

export const Capitalize = (str) => {
    // return str
    // .toLowerCase()
    // .split(' ')
    // .map(function(word) {
    //     console.log("First capital letter: "+word[0]);
    //     console.log("remain letters: "+ word.substr(1));
    //     return word[0].toUpperCase() + word.substr(1);
    // })
    // .join(' ');
    return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase();
    })
}

 console.log("capitalise", Capitalize("PHARMACY"))

export const capitalizeOnlyFirstLetter = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

console.log("capitalise", capitalizeOnlyFirstLetter("pharmacy notes"))