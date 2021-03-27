$(function () {
    listarCarpetas();
    $('#btnShowFolders').on('click', function(){
        $('#folder-container').removeClass('d-none');
        $('#task-container').addClass('d-none');
    });

    let btnAddFolder = $('#btnAddFolder');
    btnAddFolder.on('click', function() {
        if(validateFolder()){
            addFolder();
        }
    });
});

// POST
function addFolder(){
    let folder = {
        name: $('#inpFolderName').val()
    }
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/folders/insertar",
        data: JSON.stringify(folder),
        contentType: "application/json",
        success: function (response) {
            $('#inpFolderName').val('');
            listarCarpetas();
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

// GET
function listarCarpetas(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/folders/listar",
        data: null,
        dataType: "JSON",
        success: function (response) {
            mostrarCarpetas(response);
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}


// DELETE
function borrarCarpeta(carpeta){
    $.ajax({
        type: "DELETE",
        url: 'http://localhost:8080/folders/eliminar/'+carpeta.id_folder,
        data: null,
        success: function (response) {
            listarCarpetas();
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

function mostrarCarpetas(carpetas){
    let divCarpetas = $('#folders');
    divCarpetas.html('');
    let fila;
    if( carpetas.length > 0 ) {
        carpetas.forEach(carpeta => {
            fila = `<p class="d-flex justify-content-between">
                        <span>-${carpeta.name}</span>
                        <a href="./folder.html?id=${carpeta.id_folder}" id="viewFolder${carpeta.id_folder}">View items</a>
                        <a href="#" id="removeFolder${carpeta.id_folder}">Remove</a>
                    </p>`;
            divCarpetas.append(fila);
    
            $(`#removeFolder${carpeta.id_folder}`).on('click', function(){
                borrarCarpeta(carpeta);
            });
        });
    } else {
        divCarpetas.html('There are no folders yet. Create a folder.')
    }
}