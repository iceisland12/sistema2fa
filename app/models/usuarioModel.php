<?php

/**
 * Plantilla general de modelos
 * Versión 1.0.1
 *
 * Modelo de usuario
 */
class usuarioModel extends Model {
  public static $t1   = 'usuarios'; // Nombre de la tabla en la base de datos;

 
  
  // Nombre de tabla 2 que talvez tenga conexión con registros
  //public static $t2 = '__tabla 2___'; 
  //public static $t3 = '__tabla 3___'; 

  function __construct()
  {
    // Constructor general
  }
  
  static function all()
  {
    // Todos los registros
    $sql = 'SELECT * FROM usuarios ORDER BY id DESC';
    return ($rows = parent::query($sql)) ? $rows : [];
  }

  static function by_id($id)
  {
    // Un registro con $id
    $sql = 'SELECT * FROM usuarios WHERE id = :id LIMIT 1';
    return ($rows = parent::query($sql, ['id' => $id])) ? $rows[0] : [];
  }

  // Cargue con base al nombre de usuario

  static function by_usuario($usuario)
  {

    $sql = 'SELECT * FROM usuarios WHERE usuario = :usuario LIMIT 1';
    return ($rows = parent::query($sql, ['usuario' => $usuario])) ? $rows[0] : [];
  }

  // Cargue con base al has del usuario
  static function by_hash($hash)
  {

    $sql = 'SELECT * FROM usuarios WHERE hash = hash LIMIT 1';
    return ($rows = parent::query($sql, ['hash' => $hash])) ? $rows[0] : [];
  }

}

//echo usuarioModel::$t1;
