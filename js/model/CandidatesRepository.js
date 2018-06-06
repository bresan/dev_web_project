BASE_URL = "http://andrebordignon.esy.es/php/";

URL_ADD = BASE_URL + "incluicandidato.php";
URL_GET = BASE_URL + "consultacandidatos.php";
URL_EDIT = BASE_URL + "atualizacandidato.php";
URL_DELETE = BASE_URL + "deletecandidato.php";

function addCandidateRemote(candidate, callback) {
    $.post(URL_ADD, candidate, function (data) {
        callback(data)
    });
}

function getCandidatesRemote(callback) {
    $.get(URL_GET, function (data) {
        callback(data)
    });
}

function editCandidateRemote(candidate, callback) {
    $.ajax({
        url: URL_EDIT,
        type: 'PUT',
        success: function (result) {
            callback(result)
        }
    });
}

function deleteCandidateRemote(candidateId, callback) {
    $.ajax({
        url: URL_DELETE,
        type: 'DELETE',
        success: function (result) {
            callback(result)
        }
    });
}