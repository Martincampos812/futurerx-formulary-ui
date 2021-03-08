const formatDate = (datetime) =>{
    let month = ["January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"];
  
    let date1 = new Date();
    let date2 = new Date(datetime + ' UTC');
  
    let millisec = date1.getTime() - date2.getTime()
  
    let seconds = parseInt((millisec / 1000).toFixed(1));
  
    let minutes = parseInt((millisec / (1000 * 60)).toFixed(1));
  
    let hours = parseInt((millisec / (1000 * 60 * 60)).toFixed(1));
  
    let days = parseInt((millisec / (1000 * 60 * 60 * 24)).toFixed(1));
  
    if (seconds <= 0) {
      return "Few Seconds ago";
    }
    else if (seconds < 60) {
      return seconds + " Seconds ago";
    } else if (minutes < 60) {
      return minutes + " Minutes ago";
    } else if (hours < 24) {
      return hours + " Hours ago";
    } else {
      return month[date2.getMonth()] + " " + date2.getDate() + ", " + date2.getFullYear()
    }
  
  }

export const dateFormat = {
      dateFormat: formatDate
}