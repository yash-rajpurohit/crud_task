// function to check weather the date is a valid format or not

const isDate = (s) => {
    if(s == ""){
        return true
    }
    else if(isNaN(s) && !isNaN(Date.parse(s))){
        return true
    }
    else return false;
}

module.exports = isDate;