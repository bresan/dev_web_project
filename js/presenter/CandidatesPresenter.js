var current_edit_id = -1;

function loadCandidates() {
    getCandidatesRemote(function (data) {
        var candidates = JSON.parse(data);

        renderListCandidates(candidates)
    });
}

function notCurrentlyBeingEdited(candidate) {
    return current_edit_id != candidate.id;
}

function addCandidate(candidate, callback) {
    if (isCandidateValid(candidate)) {
        addCandidateRemote(candidate, function () {
            callback(states.SUCCESS_ADDED)
        });
    } else {
        callback(states.ERROR_INVALID_FORM);
    }
}

function removeCandidate(candidate_id, callback) {
    deleteCandidateRemote(candidate_id, function () {
        callback(states.SUCCESS_REMOVED)
    })
}

function editCandidate(candidate, callback) {
    editCandidateRemote(candidate, function () {
        callback(states.SUCCESS_EDITED)
    });
}

function isCandidateValid(candidate) {
    if (!candidate.nome) return false;

    return true
}

function loadProvincesFields() {
    getProvinces(function (data) {
        renderListProvinces(data);
    });
}