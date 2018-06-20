var CandidateFormView = {
    view: {
        form: $("#formCadastro"),

        listStates: $("#estados"),
        listCities: $("#cidades"),

        btnEdit: $("#edit"),
        btnCancel: $("#cancel"),
        btnRemove: $("#remove"),
        btnSubmit: $("#submit"),

        txtNome: $("#txtName"),
        txtSexo: $("#txtSexo"),
        txtDataNasc: $("#txtNascimento"),
        txtRua: $("#txtRua"),
        txtNumero: $("#txtNumero"),
        txtBairro: $("#txtBairro"),
        txtCpf: $("#txtCpf"),
        txtCadjus: $("#txtCadjus"),
        txtEmail: $("#txtEmail"),
        txtSenha: $("#txtSenha"),

        txtStatus: $("#spanStatus")
    },
    messages: {
        SELECT_STATE: "Selecione o estado",
        MSG_SUCCESSFULLY_REMOVED: "Removido com sucesso",
        MSG_SUCCESSFULLY_EDITED: "Senha incorreta",
        MSG_INCORRECT_PASSWORD: "Senha incorreta"
    },
    data: {
        provinces: null
    },


    /**
     * This function is used to reset the add form to its original state
     */
    resetForm() {
        current_edit_id = -1;

        CandidateFormView.view.form[0].reset();
        CandidateFormView.view.btnEdit.hide();
        CandidateFormView.view.btnCancel.hide();
        CandidateFormView.view.btnRemove.hide();
        CandidateFormView.view.btnSubmit.show();
    },


    /**
     * This function is used to init the change listener for the option select for 'Estado'
     * @param provinces the provinces list with the associated cities
     */
    initStateChangeListener(provinces) {
        CandidateFormView.view.listStates.change(function () {

            let optionsCities = '';
            let selected = $("#estados option:selected").text();

            provinces.forEach(function (province) {
                if (province.sigla == selected) {
                    province.cidades.forEach(function (city) {
                        optionsCities += '<option value="' + city + '">' + city + '</option>';
                    })
                }
            });

            $("#cidades").html(optionsCities);
        }).change();
    },


    /**
     * This function is used (as the name says) to set a new location on the add form
     * @param state the new state/province
     * @param city the new city
     */
    setNewLocation(state, city) {
        CandidateFormView.view.listStates.val(state);

        let options_cidades = '';

        CandidateFormView.data.provinces.forEach(function (province) {
            if (province.sigla == state) {
                province.cidades.forEach(function (city) {
                    options_cidades += '<option value="' + city + '">' + city + '</option>';
                })
            }
        });

        CandidateFormView.view.listCities.html(options_cidades);
        CandidateFormView.view.listCities.val(city);
    },


    /**
     * This method is used to render the list of all the provinces
     * @param estados the received list of provinces
     */
    renderListProvinces(estados) {
        CandidateFormView.data.provinces = estados;

        let options = '<option value="">' + CandidateFormView.messages.SELECT_STATE + '</option>';

        $.each(estados, function (key, val) {
            options += '<option value="' + val.sigla + '">' + val.sigla + '</option>';
        });

        CandidateFormView.view.listStates.html(options);

        CandidateFormView.initStateChangeListener(estados);
    },


    /**
     * This function is used to retrieve all the form data into a single object
     * @returns the object containing the candidate
     */
    getCandidateFormData() {
        let candidate = {
            nome: CandidateFormView.view.txtNome.val(),
            sexo: CandidateFormView.view.txtSexo.val(),
            dataNasc: CandidateFormView.view.txtDataNasc.val(),
            rua: CandidateFormView.view.txtRua.val(),
            numero: CandidateFormView.view.txtNumero.val(),
            cidade: $("#cidades option:selected").text(),
            estado: $("#estados option:selected").text(),
            bairro: CandidateFormView.view.txtBairro.val(),
            cpf: CandidateFormView.view.txtCpf.val(),
            cadjus: CandidateFormView.view.txtCadjus.val(),
            email: CandidateFormView.view.txtEmail.val(),
            senha: CandidateFormView.view.txtSenha.val()
        };

        return candidate;
    },


    /**
     * This function is used to show a default message to the user (Success, failed, invalid inputs, etc)
     * @param message the message to show
     */
    showDefaultMessage(message) {
        CandidateFormView.view.txtStatus.text(message);
    },


    /**
     * This function is used to define the listener for when the action to remove an existing user is called
     * @param candidate the candidate to be removed
     */
    initRemoveCandidateListener(candidate) {
        CandidateFormView.view.btnRemove.click(function () {
            if (isPasswordMatching(candidate.senha, CandidateFormView.view.txtSenha.val())) {

                let candidate_data = CandidateFormView.getCandidateFormData();
                candidate_data.idcandidato = candidate.idcandidato;

                CandidatesPresenter.removeCandidate(candidate_data.idcandidato, function (status) {
                    CandidateTable.removeCandidateTable(candidate_data.idcandidato);
                    CandidateFormView.showDefaultMessage(CandidateFormView.messages.MSG_SUCCESSFULLY_REMOVED);
                    CandidateFormView.resetForm();
                    AnimationUtils.moveToBottom();
                });
            } else {
                CandidateFormView.showDefaultMessage(CandidateFormView.messages.MSG_INCORRECT_PASSWORD);
            }
        });
    },


    /**
     * This function is used to define the listener for when the action to edit an existing user is called
     * @param candidate the candidate to be edited
     */
    initEditCandidateListener(candidate) {
        CandidateFormView.view.btnEdit.click(function () {
            if (isPasswordMatching(candidate.senha, CandidateFormView.view.txtSenha.val())) {

                var candidate_data = CandidateFormView.getCandidateFormData();
                candidate_data.idcandidato = candidate.idcandidato;

                CandidatesPresenter.editCandidate(candidate_data, function (status) {
                    CandidateTable.updateCandidateTableValue(candidate_data);
                    CandidateFormView.resetForm();
                    CandidateFormView.showDefaultMessage(CandidateFormView.messages.MSG_SUCCESSFULLY_EDITED);
                    AnimationUtils.moveToBottom();
                });
            } else {
                CandidateFormView.showDefaultMessage(CandidateFormView.messages.MSG_INCORRECT_PASSWORD);
            }
        });
    },


    /**
     * This function is used to initialize the email listener, mostly to validate the received input
     */
    initEmailListener() {
        CandidateFormView.view.txtEmail.on('change keyup paste', function () {
            if (!isEmailValid(CandidateFormView.view.txtEmail.val())) {
                makeFieldInvalid(CandidateFormView.view.txtEmail);
            } else {
                makeFieldValid(CandidateFormView.view.txtEmail);
            }
        });
    },


    /**
     * This function is used to set up the listeners for our form to add new candidates.
     *
     * Question: callbacks vs direct call on Presenter???
     */
    initFormListener() {
        CandidateFormView.view.form.on("submit", function (event) {
            event.preventDefault();
            let candidate = CandidateFormView.getCandidateFormData();
            CandidatesPresenter.addCandidate(candidate, function (RETURN_CODE) {
                CandidatesView.processAddCandidateResponse(RETURN_CODE, candidate);
            });
        });

        CandidateFormView.initEmailListener();
    },


    /**
     * This function is used to init the edit candidate action
     * @param candidate the candidate that is being edited
     */
    initEditMode(candidate) {
        CandidateFormView.view.txtNome.val(candidate.nome);
        CandidateFormView.view.txtEmail.val(candidate.email);
        CandidateFormView.view.txtSexo.val(candidate.sexo);
        CandidateFormView.view.txtDataNasc.val(candidate.datanasc);
        CandidateFormView.view.txtCpf.val(candidate.cpf);
        CandidateFormView.view.txtCadjus.val(candidate.cadjus);
        CandidateFormView.view.txtBairro.val(candidate.bairro);
        CandidateFormView.view.txtRua.val(candidate.rua);
        CandidateFormView.view.txtNumero.val(candidate.numero);
        CandidateFormView.setNewLocation(candidate.estado, candidate.cidade);

        CandidateFormView.view.btnSubmit.hide();
        CandidateFormView.view.btnEdit.show();
        CandidateFormView.view.btnRemove.show();
        CandidateFormView.view.btnCancel.show();

        CandidateFormView.initEditCandidateListener(candidate);
        CandidateFormView.initRemoveCandidateListener(candidate);
        CandidateFormView.initCancelEditListener();
    },


    /**
     * This function is called when the edit mode is canceled in the middle of an edition
     */
    initCancelEditListener() {
        CandidateFormView.view.btnCancel.click(function () {
            // TODO check if there is something on the form before clearing it
            CandidateFormView.resetForm();
            AnimationUtils.moveToBottom();
        });
    }
};

