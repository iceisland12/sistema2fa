<?php 

class homeController extends Controller {
  function __construct()
  {
    parent::auth();
  }

  function index()
  {
    // view::render('bee', ['title' =>'hola', 'bg' => 'dark'] );
    // echo "Hola mundo";
    $data = 
    [
      'title' =>  'bienveido',
      'user' => User::profile()
    ];
    
  View::render('flash', $data);
  }


}