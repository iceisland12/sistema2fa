<?php 

class homeController extends Controller {
  function __construct()
  {
    parent::auth();
  }

  function index()
  {
    $data =
    [
      'title' => 'Bienvenido', 
      'user'  => User::profile()
    ];

    View::render('flash', $data);
  }
}