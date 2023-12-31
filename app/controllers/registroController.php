<?php

/**
 * Plantilla general de controladores
 * Versión 1.0.2
 *
 * Controlador de registro
 */
class registroController extends Controller {
  function __construct()
  {
    // Validación de sesión de usuario, descomentar si requerida
    if (Auth::validate()) {
      Redirect::to('home');
    }
  }
  
  function index()
  {
    $data = 
    [
      'title' => 'Registrate Gratis',
      'msg'   => 'Bienvenido al controlador de "registro", se ha creado con éxito si ves este mensaje.'
    ];
    
    // Descomentar vista si requerida
    View::render('index', $data);
  }


}