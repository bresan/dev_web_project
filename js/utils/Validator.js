
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

function isAgeValid(age) {
    return age > 18;
}

function isCpfValid(cpf) {
    // TODO
    return true;
}

function isBirthdayValid(date) {
    // TODO
    return true;
}

function isCadjusValid(cadjus) {
    // TODO
    return true;
}

function isPasswordMatching(pass1, pass2) {
    return pass1 === pass2;
}