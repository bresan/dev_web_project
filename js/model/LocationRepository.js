PATH_DATA = './data/cidades_estados.json';

function getProvinces(callback) {
    $.getJSON(PATH_DATA, function (data) {
        callback(data);
    })
}