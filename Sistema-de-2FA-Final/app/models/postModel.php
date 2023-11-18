<?php

/**
 * Plantilla general de modelos
 * Versión 1.0.1
 *
 * Modelo de post
 */
class postModel extends Model {
  public static $t1   = 'posts'; // Nombre de la tabla en la base de datos;
  
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
    $sql = 'SELECT * FROM posts ORDER BY id DESC';
    return ($rows = parent::query($sql)) ? $rows : [];
  }

  static function by_id($id)
  {
    // Un registro con $id
    $sql = 'SELECT * FROM posts WHERE id = :id LIMIT 1';
    return ($rows = parent::query($sql, ['id' => $id])) ? $rows[0] : [];
  }

  static function autorizado($id_usuario)
  {
    $data =
    [
      'id_usuario' => $id_usuario,
      'caducidad'  => time(),
      'ip'         => get_user_ip()
    ];

    $sql = 
    'SELECT p.* 
    FROM posts p 
    WHERE p.tipo = "2fa_autorizado" AND 
    p.id_usuario = :id_usuario AND 
    p.permalink > :caducidad AND 
    p.ip = :ip 
    ORDER BY p.creado DESC 
    LIMIT 1';
    
    return ($rows = parent::query($sql, $data)) ? $rows[0] : [];
  }

  static function has_tokens($id_usuario)
  {
    $data =
    [
      'id_usuario' => $id_usuario,
      'caducidad'  => time(),
      'ip'         => get_user_ip()
    ];

    $sql = 
    'SELECT p.*
    FROM posts p 
    WHERE p.tipo = "2fa_token" AND 
    p.id_usuario = :id_usuario AND 
    p.permalink > :caducidad AND 
    p.ip = :ip 
    ORDER BY p.creado DESC 
    LIMIT 1';
    
    return ($rows = parent::query($sql, $data)) ? $rows[0] : false;
  }
}

