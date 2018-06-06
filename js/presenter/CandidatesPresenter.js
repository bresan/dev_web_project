function loadCandidates() {
    getCandidatesRemote(function (data) {
        var candidates = JSON.parse(data);

        renderListCandidates(candidates)
    });
}

function addCandidate(candidate, callback) {
    if (isCandidateValid(candidate)) {
        addCandidateRemote(candidate, function () {
            callback(SUCCESS_ADDED)
        });
    } else {
        callback(ERROR_INVALID_FORM);
    }
}

function isCandidateValid(candidate) {
    if (!candidate.nome) return false;

    return true
}

function loadProvincesFields() {
    getProvinces(function(data) {
        renderListProvinces(data);
    });
}