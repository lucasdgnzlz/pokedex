export default `<div class="carta-respuesta" id="oculto">
<div class="contenedor-boton-cerrar-detalles">
  <button type="button" class="boton-cerrar-detalles btn-close" aria-label="Close"></button>
</div>

<div class="contenedor-pokemon-elegido">
  <div class="contenedor-principal-info">
    <div class="contenedor-nombre-poke-elegido">
      <h5 class="nombre-pokemon-elegido"></h5>
    </div>

    <div class="contenedor-id-pokemon-elegido">
      <h5 class="id-pokemon-elegido"></h5>
    </div>
  </div>

  <div class="contenedor-imagen-pokemon">
    <img src="" class="imagen-pokemon-elegido" alt="" />
  </div>

  <div class="contenedor-tipos-pokemon-elegido">
    <div class="contenedor-tipo">
      <img src="" class="primer-tipo-pokemon-elegido imagen-tipos" />
    </div>

    <div class="contenedor-tipo">
      <img src="" class="segundo-tipo-pokemon-elegido imagen-tipos" />
    </div>
  </div>

  <div class="informacion-stats">
    <div class="contenedor-titulo-stats">
      <h4 class="titulo-stats">Stats base</h4>
      <hr />
    </div>

    <div class="contenedor-stats">
      <ul class="lista-stats">
        <li class="vida-base item-lista">Vida:</li>
        <li class="ataque-base item-lista">Ataque:</li>
        <li class="defensa-base item-lista">Defensa:</li>
        <li class="ataque-base item-lista">Ataque Especial:</li>
        <li class="defensa-base item-lista">Defensa Especial:</li>
        <li class="velocidad-base item-lista">Velocidad:</li>
      </ul>

      <ul class="lista-respuestas-stats">
        <li class="vida-base-respuesta item-lista"></li>
        <li class="ataque-base-respuesta item-lista"></li>
        <li class="defensa-base-respuesta item-lista"></li>
        <li class="ataque-especial-base-respuesta item-lista"></li>
        <li class="defensa-especial-base-respuesta item-lista"></li>
        <li class="velocidad-base-respuesta item-lista"></li>
      </ul>
    </div>
  </div>
</div>
</div>`;
