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

  // Cargar todos los códigos de países e info
  function get_codigos_paises() {
    var body = $('body'),
    form     = $('#registro_form'),
    select   = $('#pais', form),
    opciones = '',
    hook     = 'bee_hook',
    action   = 'post',
    csrf     = Bee.csrf;

    if (form.length == 0) return;

    select.html('');

    $.ajax({
      url: 'ajax/get_codigos_paises',
      type: 'get',
      dataType: 'json',
      data : { hook , action , csrf },
      beforeSend: function() {
        body.waitMe();
      }
    }).done(function(res) {
      opciones += '<option value="none" disabled selected>Selecciona una opción...</option>';
      $.each(res.data, function(k, v) {
        opciones += '<option value="'+v.dialCode+'">'+v.name+' ('+v.dialCode+')</option>';
      });

      select.html(opciones);
    }).fail(function(err) {
      toastr.error('Hubo un error al cargar la lista de países.', '¡Upss!');
    }).always(function() {
      body.waitMe('hide');
    })
  }
  get_codigos_paises();

  // Registrar un nuevo usuario
  $('#registro_form').on('submit', do_registrar_usuario);
  function do_registrar_usuario(e) {
    e.preventDefault();

    var form = $('#registro_form'),
    select   = $('#pais', form),
    pais     = select.val(),
    data     = new FormData(form.get(0));

    // Validar campos
    if (pais === 'none' || pais === null) {
      toastr.error('Selecciona un país válido.');
      return;
    }

    // AJAX
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

  // Ingresar a cuenta login de usuario v1
  $('#login_form').on('submit', do_login_usuario_v2);
  function do_login_usuario_v1(e) {
    e.preventDefault();

    var form = $('#login_form'),
    data     = new FormData(form.get(0));

    // AJAX
    $.ajax({
      url: 'ajax/do_login_usuario_v1',
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

  // Cuenta regresiva de caducidad de token
  function caducidad() {
    var form  = $('#verificacion_form'),
    span1     = $('.caducidad_token'),
    span2     = $('.caducidad_texto'),
    caducidad = parseInt(span1.data('caducidad')); // 2 minutos

    if (form.length === 0) return;

    span1.html(caducidad);
    setInterval(function() {
      if (caducidad > 0) {
        caducidad = caducidad - 1;
        span1.html(caducidad);
        span2.html((caducidad === 1 ? 'segundo restante.' : 'segundos restantes.'));
      } else {
        span1.remove();
        span2.html('Tu código de verificación ha expirado.');
        $('button', form).attr('disabled', true);
      }
    }, 1000);
  }
  caducidad();

  // Verificación de token
  $('#verificacion_form').on('submit', do_verificar);
  function do_verificar(e) {
    e.preventDefault();

    var form = $('#verificacion_form'),
    wrapper  = $('#verificacion_wrapper'),
    input    = $('#token', form),
    token    = input.val(),
    data     = new FormData(form.get(0));
    data.append('action', 'post');

    // Validar longitud de token
    if (token.length !== 6) {
      toastr.error('Ingresa un código de 6 números.');
      input.focus();
      return;
    }

    // AJAX
    $.ajax({
      url: 'ajax/do_verificar',
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
        form.fadeOut();
        wrapper.html('<img src="'+Bee.images+'verificado.png" style="width: 150px;">');
        wrapper.append('<h2 class="text-center mt-3">¡Verificado con éxito!</h2>');

        setTimeout( function() {
          window.location.href = res.data.url;
        }, 5000);

      } else {
        toastr.error(res.msg, '¡Upss!');
      }
    }).fail(function(err) {
      toastr.error('Hubo un error en la petición', '¡Upss!');
    }).always(function() {
      form.waitMe('hide');
    })
  }

  // Reenviar código de verificación
  $('.reenviar_codigo').on('click', do_reenviar_codigo);
  function do_reenviar_codigo(e) {
    e.preventDefault();

    var form = $('#verificacion_form'),
    hash     = $('#hash', form).val(),
    link     = $('.reenviar_codigo'),
    data     = new FormData();
    
    data.append('hook'  , 'bee_hook');
    data.append('action', 'post');
    data.append('csrf'  , Bee.csrf);
    data.append('hash'  , hash);

    if (!confirm('¿Estás seguro?')) return;

    // AJAX
    $.ajax({
      url: 'ajax/do_reenviar_codigo',
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
        link.attr('disabled', true);
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