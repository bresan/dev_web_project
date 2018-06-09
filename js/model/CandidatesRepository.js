BASE_ENDPOINT = "http://andrebordignon.esy.es/php/";

URL_ADD_CANDIDATE = BASE_ENDPOINT + "incluicandidato.php";
URL_GET_CANDIDATES = BASE_ENDPOINT + "consultacandidatos.php";
URL_EDIT_CANDIDATE = BASE_ENDPOINT + "atualizacandidato.php";
URL_DELETE_CANDIDATE = BASE_ENDPOINT + "deletacandidato.php";

function addCandidateRemote(candidate, callback) {
    $.post(URL_ADD_CANDIDATE, candidate, function (data) {
        callback(data)
    });
}

function getCandidatesRemote(callback) {
    $.get(URL_GET_CANDIDATES, function (data) {
        callback(data)
    });
}

function editCandidateRemote(candidate, callback) {
    $.post(URL_EDIT_CANDIDATE, candidate, function (data) {
        callback(data)
    });
}

function deleteCandidateRemote(candidateId, callback) {

    var data = {
        idcandidato: candidateId
    };

    $.post(URL_DELETE_CANDIDATE, data, function (data) {
        callback(data)
    });
}