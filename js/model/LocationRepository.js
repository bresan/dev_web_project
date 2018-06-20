PATH_DATA = './data/cidades_estados.json';

var LocationRepository = {
    getProvinces(callback) {
        $.getJSON(PATH_DATA, function (data) {
            callback(data);
        })
    }
};