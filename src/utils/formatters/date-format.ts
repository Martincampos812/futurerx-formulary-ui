import moment from "moment";

export const formatDate = (str) => {
  return (
   str && moment(str).isValid() ? moment(str).format('M/D/YYYY') : ""
  )
}

export const formatDateAndTime = (str) => {
  return (
    moment(str).format('M/D/YYYY HH:mm:ss A')
  )
}


