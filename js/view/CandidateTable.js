var CandidateTable = {
    view: {
        table: $("#candidates-table")
    },
    message: {
        EDIT_CANDIDATE: "Editar"
    },

    /**
     * Function used to create a new column with text content inside of it and adds it to a parent view
     * @param text the text to be added
     * @param parent the parent view where the column will be added
     * @returns {Element} the column with text
     */
    createColumnWithText(text, parent) {
        var column = CandidateTable.createColumn();
        var textNode = document.createTextNode(text);
        column.appendChild(textNode);
        parent.appendChild(column);
        return column;
    },

    /**
     * Function used to create a simple column
     * @returns {Element} the column
     */
    createColumn() {
        return document.createElement("td");
    },

    /**
     * Function used to update a given row in the table
     * @param candidate the candidate used to find the row
     */
    updateCandidateTableValue(candidate) {
        $('table#candidates-table tr#' + candidate.idcandidato).replaceWith(CandidateTable.makeCandidateTableItem(candidate));
    },

    /**
     * Function used to remove a given row in the table
     * @param candidate the candidate used to find the row
     */
    removeCandidateTable(candidate_id) {
        $('table#candidates-table tr#' + candidate_id).remove();
    },

    /**
     * This function is used to create the actions (edit) to a given candidate on the table
     * @param candidate
     * @returns {Element}
     */
    createViewActions(candidate) {
        let container = document.createElement("div");

        let btnEdit = document.createElement("input");
        btnEdit.type = "submit";
        btnEdit.value = CandidateTable.message.EDIT_CANDIDATE;
        btnEdit.className = "btn-info btn-xs";

        $(btnEdit).click(function () {
            AnimationUtils.moveToTop();
            if (CandidatesPresenter.isNotCurrentlyBeingEdited(candidate)) {
                current_edit_id = candidate.idcandidato;
                CandidateFormView.initEditMode(candidate);
            }
        });

        container.appendChild(btnEdit);

        return container;
    },

    /**
     * Renders a single item into the candidate table
     * @param candidate the item to be rendered
     */
    makeCandidateTableItem(candidate) {
        let row = document.createElement("tr");
        row.setAttribute("id", candidate.idcandidato);

        CandidateTable.createColumnWithText(candidate.nome, row);
        CandidateTable.createColumnWithText(candidate.sexo, row);
        CandidateTable.createColumnWithText(candidate.datanasc, row);
        CandidateTable.createColumnWithText(candidate.rua, row);
        CandidateTable.createColumnWithText(candidate.numero, row);
        CandidateTable.createColumnWithText(candidate.cidade, row);
        CandidateTable.createColumnWithText(candidate.estado, row);
        CandidateTable.createColumnWithText(candidate.cpf, row);
        CandidateTable.createColumnWithText(candidate.cadjus, row);
        CandidateTable.createColumnWithText(candidate.email, row);

        let colActions = CandidateTable.createColumn();
        let txtActions = CandidateTable.createViewActions(candidate);
        colActions.appendChild(txtActions);
        row.appendChild(colActions);

        return row;
    },

    /**
     * This function is used to add a given candidate to our table
     * @param candidate
     */
    addCandidateToTable(candidate) {
        var item = CandidateTable.makeCandidateTableItem(candidate);

        // need to get the first element because otherwise it returns a jQuery object instead of a DOM
        CandidateTable.view.table[0].appendChild(item);
    }
};
