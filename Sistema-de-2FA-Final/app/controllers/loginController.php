<?php 

class loginController extends Controller {
  function __construct()
  {
    if (Auth::validate()) {
      Flasher::new('Ya hay una sesión abierta.');
      Redirect::to('home');
    }
  }

  function index()
  {
    $data =
    [
      'title'   => 'Ingresar a tu cuenta',
      'padding' => '0px'
    ];

    View::render('index', $data);
  }

  function post_login()
  {
    try {
      if (!Csrf::validate($_POST['csrf']) || !check_posted_data(['usuario','csrf','password'], $_POST)) {
        throw new Exception('Acceso no autorizado.');
      }
  
      // Data pasada del formulario
      $usuario  = clean($_POST['usuario']);
      $password = clean($_POST['password']);
  
      // Validar que exista un usuario
      if (!$user = usuarioModel::by_usuario($usuario)) {
        throw new Exception('Las credenciales no son correctas, intenta de nuevo.');
      }

      // Verificar la contraseña del usuario
      if (!password_verify($password.AUTH_SALT, $user['password'])) {
        throw new Exception('Las credenciales no son correctas, intenta de nuevo.');
      }
  
      // Loggear al usuario
      Auth::login($user['id'], $user);
      Redirect::to('home');
      
    } catch (Exception $e) {
      Flasher::new($e->getMessage(), 'danger');
      Redirect::back();
    }
  }

  function verificar()
  {
    try {
      // Verificación de que exista un token válido para el usuario
      // Usamos el hash en la URL para validar la existencia del usuario en cursos
      $hash      = isset($_GET["hash"]) ? clean($_GET["hash"], true) : null;
      $user      = null;
      $caducidad = 0;
      if ($hash === null) {
        throw new Exception('Algo salió mal, intenta más tarde.');
      }

      // Validar existencia del usuario
      if (!$user = usuarioModel::by_hash($hash)) {
        throw new Exception('Algo salió mal, intenta más tarde.');
      }

      // Validar existencia de un token de verificación válido
      if (!$token = postModel::has_tokens($user['id'])) {
        throw new Exception('Algo salió mal, intenta más tarde.');
      }

      // Calcular el tiempo de caducidad del token
      $caducidad = $token['permalink'] - time();
      $caducidad = $caducidad < 0 ? 0 : $caducidad;

      $data =
      [
        'title'     => 'Verificar cuenta',
        'hash'      => $hash,
        'caducidad' => $caducidad
      ];
  
      View::render('2fa', $data);
      
    } catch (Exception $e) {
      Flasher::new($e->getMessage(), 'danger');
      Redirect::to('login');
    }
  }
}