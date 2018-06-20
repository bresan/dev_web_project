function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function isNameValid(name) {
    return name.length < 255;
}

function isEmailValid(email) {
    console.log(email);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isAgeValid(birthday) {
    var age = calculateAge(birthday);
    return age > 18;
}

function isCpfValid(cpf) {
    // TODO
    return true;
}

function calculateAge(birthday) { // birthday is a date
    var birthDayDate = Date(birthday);
    var ageDifMs = Date.now() - birthDayDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function isBirthdayValid(date) {
    return isAgeValid(date);
}

function isCadjusValid(cadjus) {
    if (cadjus >= 1 && cadjus <= 5000) return true;
}

function isPasswordMatching(pass1, pass2) {
    return pass1 === pass2;
}