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
    // Si ya hay una sesión creada y válida, no se puede registrar
    if (Auth::validate()) {
      Redirect::to('home');
    }
  }
  
  function index()
  {
    $data = 
    [
      'title' => 'Regístrate gratis'
    ];
    
    // Descomentar vista si requerida
    View::render('index', $data);
  }
}