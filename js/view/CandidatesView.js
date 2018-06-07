/** Html items id's **/
ID_LIST_CANDIDATES = "candidates-list";


states = {
    /** Response values from presenter **/
    ERROR_INVALID_FORM: 0,
    ERROR_SERVER_OFF: 1,
    SUCCESS_ADDED: 2,
    SUCCESS_EDITED: 3,
    SUCCESS_REMOVED: 4
};

/**
 * This function is used to render our received candidates list into the screen
 */
function renderListCandidates(candidates) {
    for (const candidate of candidates) {
        addCandidateTableItem(candidate);
    }
}

/**
 * This function is used to init the change listener for the option select for 'Estado'
 * @param provinces the provinces list with the associated cities
 */
function initEstadoChangeListener(provinces) {
    $("#estados").change(function () {

        var options_cidades = '';
        var selected = $("#estados option:selected").text();

        provinces.forEach(function (province) {
            if (province.sigla == selected) {
                province.cidades.forEach(function (city) {
                    options_cidades += '<option value="' + city + '">' + city + '</option>';
                })
            }
        });

        $("#cidades").html(options_cidades);
    }).change();

}

/**
 * This method is used to render the list of all the provinces
 * @param estados the received list of provinces
 */
function renderListProvinces(estados) {
    var options = '<option value="">Selecione o estado</option>';

    $.each(estados, function (key, val) {
        options += '<option value="' + val.sigla + '">' + val.sigla + '</option>';
    });

    $("#estados").html(options);

    initEstadoChangeListener(estados);
}

function createColumn() {
    return document.createElement("td");
}


function updateCandidateTableValue(candidate) {

}

function initEditMode(candidate) {
    $("#txtName").val(candidate.nome);
    $("#txtEmail").val(candidate.email);
    $("#txtSexo").val(candidate.sexo);
    $("#txtNascimento").val(candidate.datanasc);
    $("#txtCpf").val(candidate.cpf);
    $("#txtCadjus").val(candidate.cadjus);
    $("#txtBairro").val(candidate.bairro);
    $("#txtRua").val(candidate.rua);
    $("#txtNumero").val(candidate.numero);
    $("#estados").val(candidate.estado);

    // fix loading city
    $("#cidades").val(candidate.cidade);

    var btnEdit = document.createElement("input");
    btnEdit.type = "button";
    btnEdit.value = "Editar";
    btnEdit.className = "btn btn-info";

    $("#submit").hide();
    $("#edit").append(btnEdit);

    $(btnEdit).click(function () {
        if (passwordIsCorrect(candidate.senha)) {
            var candidate_data = getCandidateData();
            candidate_data.idcandidato = candidate.idcandidato;
            editCandidate(candidate_data, function (status) {
                // update table too
                updateCandidateTableValue(candidate_data);
                showDefaultMessage("Editado com sucesso");
            });
        } else {
            showDefaultMessage("Senha incorreta!");
        }
    });
}

function passwordIsCorrect(password) {
    return password === $("#txtSenha").val()
}


function createViewActions(candidate) {
    var container = document.createElement("div");

    var btnEdit = document.createElement("input");
    btnEdit.type = "submit";
    btnEdit.value = "Editar";
    btnEdit.className = "btn btn-info";

    $(btnEdit).click(function () {
        if (notCurrentlyBeingEdited(candidate)) {
            current_edit_id = candidate.idcandidato;
            initEditMode(candidate);
        }
    });

    container.appendChild(btnEdit);

    return container;
}

/**
 * Renders a single item into the candidate table
 * @param candidate the item to be rendered
 */
function addCandidateTableItem(candidate) {
    var table = document.getElementById("candidates-table");

    var row = document.createElement("tr");

    var colName = createColumn();
    var colSexo = createColumn();
    var colNascimento = createColumn();
    var colRua = createColumn();
    var colNumero = createColumn();
    var colCidade = createColumn();
    var colEstado = createColumn();
    var colCpf = createColumn();
    var colCadjus = createColumn();
    var colEmail = createColumn();
    var colActions = createColumn();

    var txtName = document.createTextNode(candidate.nome);
    var txtSexo = document.createTextNode(candidate.sexo);
    var txtNascimento = document.createTextNode(candidate.datanasc);
    var txtRua = document.createTextNode(candidate.rua);
    var txtNumero = document.createTextNode(candidate.numero);
    var txtCidade = document.createTextNode(candidate.cidade);
    var txtEstado = document.createTextNode(candidate.estado);
    var txtCpf = document.createTextNode(candidate.cpf);
    var txtCadjus = document.createTextNode(candidate.cadjus);
    var txtEmail = document.createTextNode(candidate.email);

    var txtActions = createViewActions(candidate);

    colName.appendChild(txtName);
    colSexo.appendChild(txtSexo);
    colNascimento.appendChild(txtNascimento);
    colRua.appendChild(txtRua);
    colNumero.appendChild(txtNumero);
    colCidade.appendChild(txtCidade);
    colEstado.appendChild(txtEstado);
    colCpf.appendChild(txtCpf);
    colCadjus.appendChild(txtCadjus);
    colEmail.appendChild(txtEmail);
    colActions.appendChild(txtActions);

    row.appendChild(colName);
    row.appendChild(colSexo);
    row.appendChild(colNascimento);
    row.appendChild(colRua);
    row.appendChild(colNumero);
    row.appendChild(colCidade);
    row.appendChild(colEstado);
    row.appendChild(colCpf);
    row.appendChild(colCadjus);
    row.appendChild(colEmail);
    row.appendChild(colActions);

    table.appendChild(row);
}


function getCandidateData() {
    var cpf = $("#txtCpf").val()
    console.log('cpf: ', cpf);
    // get selected
    var candidate = {
        nome: $("#txtName").val(),
        sexo: $("#txtSexo").val(),
        dataNasc: $("#txtNascimento").val(),
        rua: $("#txtRua").val(),
        numero: $("#txtNumero").val(),
        cidade: $("#cidades option:selected").text(),
        estado: $("#estados option:selected").text(),
        bairro: $("#txtBairro").val(),
        cpf: $("#txtCpf").val(),
        cadjus: $("#txtCadjus").val(),
        email: $("#txtEmail").val(),
        senha: $("#txtSenha").val()
    };
    return candidate
}

function showDefaultMessage(message) {
    $("#spanStatus").text(message);
}

function processAddCandidateResponse(RETURN_CODE, candidate) {
    switch (RETURN_CODE) {
        case states.ERROR_INVALID_FORM:
            showDefaultMessage("Por favor, preencha o formulário corretamente");
            break;
        case states.ERROR_SERVER_OFF:
            showDefaultMessage("Erro ao comunicar-se com o servidor. Por favor, tente novamente mais tarde.");
            break;
        case states.SUCCESS_ADDED:
            addCandidateTableItem(candidate);
            break;

        default:
            showDefaultMessage("Algo de errado aconteceu. Tente novamente mais tarde.");
            break;
    }
}

/**
 * This function is used to set up the listeners for our form to add new candidates.
 *
 * Question: callbacks vs direct call on Presenter???
 */
function initFormListener() {
    $("#formCadastro").on("submit", function (event) {
        event.preventDefault();
        var candidate = getCandidateData();
        addCandidate(candidate, function (RETURN_CODE) {
            processAddCandidateResponse(RETURN_CODE, candidate);
        });
    });
}

/**
 * This function is called once the page is loaded
 */
$(document).ready(function () {
    loadCandidates();
    loadProvincesFields();

    initFormListener();
});
