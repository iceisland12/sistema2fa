<?php 

/**
 * La primera función de pruebas del curso de creando el framework MVC
 *
 * @return void
 */
function en_custom() {
  return 'ESTOY DENTRO DE CUSTOM_FUNCTIONS.';
}

/**
 * Carga las diferentes divisas soporatadas en el proyecto de pruebas
 *
 * @return void
 */
function get_coins() {
  return 
  [
    'MXN',
    'USD',
    'CAD',
    'EUR',
    'ARS',
    'AUD',
    'JPY'
  ];
}

function get_msb_api_key($mode = 'test')
{
  $key = null;
  switch ($mode) {
    case 'pro':
    case 'prod':
    case 'live':
      $key = 'UgFaUqBdicOgSKf7AQDbBbjOy';
      break;
    
    default:
      $key = 'l4usJlJT5qbxb86koUMvLAVif';
      break;
  }

  return $key;
}