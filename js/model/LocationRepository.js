PATH_DATA = './data/cidades_estados.json';

/**
 * This object is used to retrieve all the information related to the available locations to pick
 */
var LocationRepository = {
    /**
     * This function is used to retrieve all the locations from our json file
     * @param callback
     */
    getProvinces(callback) {
        $.getJSON(PATH_DATA, function (data) {
            callback(data);
        })
    }
};