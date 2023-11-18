$(document).ready(function() {

  // Toast para notificaciones
  //toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');

  // Waitme
  //$('body').waitMe({effect : 'orbit'});
  console.log('////////// Bienvenido a Bee Framework Versión ' + Bee.bee_version + ' //////////');
  console.log('//////////////////// www.joystick.com.mx ////////////////////');
  console.log(Bee);

  /**
   * Prueba de peticiones ajax al backend en versión 1.1.3
   */
  function test_ajax() {
    var body = $('body'),
    hook     = 'bee_hook',
    action   = 'post',
    csrf     = Bee.csrf;

    if ($('#test_ajax').length == 0) return;

    $.ajax({
      url: 'ajax/test',
      type: 'post',
      dataType: 'json',
      data : { hook , action , csrf },
      beforeSend: function() {
        body.waitMe();
      }
    }).done(function(res) {
      toastr.success(res.msg);
      console.log(res);
    }).fail(function(err) {
      toastr.error('Prueba AJAX fallida.', '¡Upss!');
    }).always(function() {
      body.waitMe('hide');
    })
  }
  
  /**
   * Alerta para confirmar una acción establecida en un link o ruta específica
   */
  $('body').on('click', '.confirmar', function(e) {
    e.preventDefault();

    let url = $(this).attr('href'),
    ok      = confirm('¿Estás seguro?');

    // Redirección a la URL del enlace
    if (ok) {
      window.location = url;
      return true;
    }
    
    console.log('Acción cancelada.');
    return true;
  });

  /**
   * Inicializa summernote el editor de texto avanzado para textareas
   */
  function init_summernote() {
    if ($('.summernote').length == 0) return;

    $('.summernote').summernote({
      placeholder: 'Escribe en este campo...',
      tabsize: 2,
      height: 300
    });
  }

  /**
   * Inicializa tooltips en todo el sitio
   */
  function init_tooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });
  }
  
  // Inicialización de elementos
  init_summernote();
  init_tooltips();
  test_ajax();

// Sistema 2FA


function get_codigos_paises() {

  console.log("Iniciando get_codigos_paises");
  
  var body = $('body'),
  form = $('#registro_form'),
  select = $('#pais', form),
  opciones = '',
  hook = 'bee_hook',
  action = 'post',
  csrf = Bee.csrf;

  console.log("Buscando el formulario");
  console.log($('#registro_from').length);

  if (form.length == 0) return;

  select.html('');

  $.ajax({
    url: 'ajax/get_codigos_paises',
    type:'get',
    dataType: 'json',
    data: {hook, action, csrf},
    beforeSend: function(){
      body.waitMe();
    }

  }).done(function(res){
    opciones += '<option value="none" disable selected> Selecciona una opción...</option>';
    $.each(res.data, function(k,v){
      opciones += '<option value="'+v.dialCode+'">'+v.name+'('+v.dialCode+')</option>';
    })
    select.html(opciones);
    console.log("Petición AJAX éxitosa!");
    console.log(res);
    
  }).fail(function(err){
    console.error("Ocurrió un error en la petición AJAX");
    console.error(err);
    toastr.error('Hubo un error');
    
  }).always(function(){
    body.waitMe('hide')
  });

}

get_codigos_paises();


// registrar usuarios
$('#registro_form').on('submit', do_registrar_usuarios);
function do_registrar_usuarios(e) {

  console.log("do_registrar_usuarios");
  
  e.preventDefault();
  var form = $('#registro_form'),
  select = $('#pais', form),
  pais = select.val(),
  data = new FormData(form.get(0))
  action = 'post';


  console.log(data);
  console.log($('#registro_from').length);

  //validaciones de los campos

  if(pais === 'none' || pais === null){
    toastr.error('Debes seleccionar tu país.');
    return;
  }

  $.ajax({
    url: 'ajax/do_registrar_usuario',
    type: 'post',
    dataType: 'json',
    contentType: false,
    processData: false,
    cache: false,
    data : data,
    beforeSend: function() {
      form.waitMe();
    }
  }).done(function(res) {
    if(res.status === 201) {
      toastr.success(res.msg, '¡Bien!');
      $('button', form).attr('disabled', true);

      setTimeout( function() {
        window.location.href = Bee.url + 'login';
      }, 2000);

    } else {
      toastr.error(res.msg, '¡Upss!');
    }
  }).fail(function(err) {
    toastr.error('Hubo un error en la petición.', '¡Upss!');
  }).always(function() {
    form.waitMe('hide');
  })
}
// Login form 
$('#login_form').on('submit', do_login_usuario_v2);
function do_login_usuario_v2(e) {
  e.preventDefault();

  var form = $('#login_form'),
  data     = new FormData(form.get(0));

  // AJAX
  $.ajax({
    url: 'ajax/do_login_usuario_v2',
    type: 'post',
    dataType: 'json',
    contentType: false,
    processData: false,
    cache: false,
    data : data,
    beforeSend: function() {
      form.waitMe();
    }
  }).done(function(res) {
    if(res.status === 200) {
      toastr.success(res.msg, '¡Bien!');
      $('button', form).attr('disabled', true);

      setTimeout( function() {
        window.location.href = res.data.url;
      }, 2000);

    } else {
      toastr.error(res.msg, '¡Upss!');
    }
  }).fail(function(err) {
    toastr.error('Hubo un error en la petición', '¡Upss!');
  }).always(function() {
    form.waitMe('hide');
  })
}


});

