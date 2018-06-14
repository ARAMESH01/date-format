// const validate = (inputDate, dateFormat) => {
//   let dateRegEx = dateRegExStr.replace(new RegExp("D{1,2}", "g"), "[0-31]\\d") ;
//   dateRegEx = dateRegEx.replace(new RegExp("M{1,2}", "g"), "[0-1][0-2]");
//   dateRegEx = "^" + dateRegEx.replace(new RegExp("Y{1,4}", "g"), "(\\d{2}|\\d{4})") +
//     "$";
//   console.log("dateRegEx: " + dateRegEx);
//   let dateRegExpObj = new RegExp(dateRegEx);
//   console.log("dateRegExObj: " + dateRegExpObj);
//   // console.log('dateRegEx: ' + dateRegEx);
//   //  \d{1,2}-\d{1,2}-\d{1,2}\d{1,2}
//   let dateRegExpObj = new RegExp(dateRegEx);
//   // console.log('dateRegExObj: ' + dateRegExpObj);
//   return dateRegExpObj.test(inputDate);
// };

const isDateValid = () => {
  let inputDate = document.getElementById("date").value;
  let dateFormat = document.getElementById("date-format").value;
  // console.log('Date: ' + inputDate + ' DateFormat: ' + dateFormat);
  // let isValid = validate(inputDate, dateFormat);
  let isValid = isInputDateValid(dateFormat, inputDate);
  // console.log("Date format is valid: " + isValid);
  document.getElementById("response").innerText = "Date format is " + (isValid ? 'valid': 'invalid');
};


// ==========

//
const isInputDateValid = (dateFormat, dateString) => {
  if(dateString == null || dateString == '') {
    return false;
  }
  if(isDateFormatValid(dateFormat)) {
    let dateStringArray = [];
    let dateFormatArray = [];

    if(dateFormat.indexOf('.') != -1 && dateString.indexOf('.') != -1) {
      dateStringArray = dateString.split('.');
      dateFormatArray = dateFormat.split('.');
    } else if(dateFormat.indexOf('-') != -1 && dateString.indexOf('-') != -1) {
      dateStringArray = dateString.split('-');
      dateFormatArray = dateFormat.split('-');
    } else if(dateFormat.indexOf('/') != -1 && dateString.indexOf('/') != -1) {
      dateStringArray = dateString.split('/');
      dateFormatArray = dateFormat.split('/');
    }
    else {
      //Input Date and Date Format do not match
      return false;
    }
    return isValidDayMonthYear(dateFormatArray[0], dateStringArray[0]) &&
            isValidDayMonthYear(dateFormatArray[1], dateStringArray[1]) &&
            isValidDayMonthYear(dateFormatArray[2], dateStringArray[2]);
  }
  return false;
}

const isValidDayMonthYear = (format, dateVal) => {
  val = parseInt(dateVal);
  if(format == 'D') {
    return (val > 0 && val <= 31);
  }
  if(format == 'M') {
    return (val > 0 && val <= 12);
  }
  if(format == 'Y') {
    return (val > 11 && val <= 9999);
  }
  return false;
}

const isDateFormatValid = (dateFormat) => {
  if(dateFormat == null ||
      dateFormat == '' ||
      dateFormat.length != 5 ||
      dateFormat.indexOf('M') == -1 ||
      dateFormat.indexOf('D') == -1 ||
      dateFormat.indexOf('Y') == -1) {
    return false;
  }
  if(countOccurances(dateFormat, '.') == 2 || countOccurances(dateFormat, '-') == 2 || countOccurances(dateFormat, '/') == 2){
    return true;
  }
  return false;
}

const countOccurances = (str, substr) => {
   return str.split(substr).length - 1;
}
