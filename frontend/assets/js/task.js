var id = getUrlVars()["id"];

$(function () {
    listarCarpetaPorID();
    let btnAddTask = $('#btnAddTask');
    btnAddTask.on('click', function() {
        if( validateTask() ){
            addTask();
        }
    });
});

// POST
function addTask(){
    let task = {
        name: $('#inpTaskName').val(),
        status: 0,
        folder: {
            id_folder: id
        }
    }
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/tasks/insertar",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (response) {
            $('#inpTaskName').val('');
            listarCarpetaPorID();
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

// GET
function listarCarpetaPorID(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/folders/listar/${id}`, 
        data: null,
        dataType: "JSON",
        success: function (response) {
            mostrarTareas(response)
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

// PUT 
function updateTask(task){
    task.folder = {id_folder: id};

    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/tasks/actualizar`, 
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (response) {
            listarCarpetaPorID();
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

function mostrarTareas(carpeta){
    $('#folder-container').addClass('d-none');
    $('#task-container').removeClass('d-none');
    $('#folder-name').text(carpeta.name);
    let divTareas = $('#tasks');
    divTareas.html('');
    let fila;
    if( carpeta.tasks.length > 0 ) {
        $.each(carpeta.tasks, function (indexInArray, task) { 
            fila = `<div class="d-flex justify-content-between">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="check${task.id_task}">
                            <label class="form-check-label" for="check${task.id_task}">
                                ${task.name}
                            </label>
                            </div>
                        <a href="#" id="editTask${task.id_task}"data-toggle="modal" data-target="#modalEditarTarea">Edit</a> 
                    </div>`;
            divTareas.append(fila);
            $(`#check${task.id_task}`).prop('checked', task.status);
    
            $(`#check${task.id_task}`).on('change', function(){
                task.status = $(this).prop('checked');
                updateTask(task); 
            });
    
            $(`#editTask${task.id_task}`).on('click', function(){
                llenarModalEditarTarea(task);
            });
        });
    } else {
        divTareas.html('There are no tasks yet. Create a task.')
    }
}

function llenarModalEditarTarea(task){
    $('#modalEditarTareaLabel').text(`Editing Task "${task.name}"`);
    $('#inpTaskNameEdit').val(task.name);

    $('#btnSaveTask').unbind('click'); 
    $('#btnSaveTask').on('click', function (){
        task.name = $('#inpTaskNameEdit').val();
        if( validateTaskUpdate() ) {
            updateTask(task);
            $('#modalEditarTarea').modal('toggle');
        }
    });
}

