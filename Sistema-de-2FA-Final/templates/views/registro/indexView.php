<?php require_once INCLUDES.'inc_header.php'; ?>

<div class="container">
  <div class="py-5 text-center">
    <a href="<?php echo URL; ?>"><img src="<?php echo get_image('bee_logo.png') ?>" alt="Bee framework" class="img-fluid" style="width: 150px;"></a>
    <h2>Regístrate</h2>
    <p class="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, ullam.</p>
  </div>

  <div class="row">
    <!-- formulario -->
    <div class="offset-xl-3 col-xl-6 col-12">
      <div class="card">
        <div class="card-header">
          <h4>Completa el formulario</h4>
        </div>
        <div class="card-body">
          <?php echo Flasher::flash(); ?>

          <form id="registro_form" method="post">
            <?php echo insert_inputs(); ?>

            <div class="mb-3">
              <label for="usuario">Usuario</label>
              <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Walter White" required>
            </div>

            <div class="mb-3">
              <label for="email">Correo electrónico</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="walter@white.com" required>
            </div>

            <div class="mb-3">
              <label for="pais">País</label>
              <select name="pais" id="pais" class="form-select">
              </select>
            </div>

            <div class="mb-3">
              <label for="telefono">Teléfono</label>
              <input type="phone" class="form-control" id="telefono" name="telefono" placeholder="55 8578 6895" required>
            </div>
            
            <div class="mb-3">
              <label for="password">Contraseña</label>
              <input type="password" class="form-control" id="password" name="password" required>
            </div>

            <div class="mb-3">
              <label for="password_conf">Confirma tu contraseña</label>
              <input type="password" class="form-control" id="password_conf" name="password_conf" required>
            </div>

            <button class="btn btn-primary btn-block" type="submit">Registrarse</button>

            <small class="text-muted float-end text-decoration-none">¿Ya tienes cuenta? Ingresa <a class="text-decoration-none" href="login">aquí</a>.</small>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require_once INCLUDES.'inc_footer_v2.php'; ?>

