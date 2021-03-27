function validateFolder() {
    let campo = $('#inpFolderName');
    let error = $('#errorFolder');
    return validate(campo, error);
}

function validateTask() {
    let campo = $('#inpTaskName');
    let error = $('#errorTask');
    return validate(campo, error);
}

function validateTaskUpdate() {
    let campo = $('#inpTaskNameEdit');
    let error = $('#errorTaskEdit');
    return validate(campo, error);
}

function validate(campo, error) {
    if( campo.val() === '' || campo.val() === null ){
        mostrarError(campo, error, 'Please enter the task name');
        return false;
    }
    else if( campo.val().length < 4 ){
        mostrarError(campo, error, 'Please enter at least 4 characters');
        return false;
    }
    quitarError( campo, error );
    return true;
}

// ######## FUNCIONES GENERICAS #########
function mostrarError( campo, error, texto ){
    campo.addClass('is-invalid');
    error.removeClass('d-none');
    error.text( texto );
    campo.removeClass('is-valid');
}

function quitarError( campo, error ){
    campo.addClass('is-valid');
    error.addClass('d-none');
    campo.removeClass('is-invalid');
    setTimeout(() => {
        campo.removeClass('is-valid');
    }, 2000);
}