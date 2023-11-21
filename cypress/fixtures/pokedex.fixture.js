export default `
<header id="oculto">
      <div class="contenedor-logo">
        <img src="img/logo-pokemon.png" class="logo-pokemon" />
      </div>
      <div class="contenedor-buscador">
        <div class="input-group">
          <input
            type="number"
            class="form-control buscador-pokemon"
            aria-label="buscar-pokemon"
            placeholder="Seleccione un Pokémon!"
            id=""
          />
          <button type="button" class="btn btn-outline-secondary boton-buscar-pokemon">Buscar</button>
        </div>
      </div>
</header>

<div class="row contenedor-estructura-main" id="oculto">
<div class="col pattern-diagonal-stripes-lg columna-decoracion"></div>

<div class="col-10 columna-contenido">
  <div class="container contenedor-grilla text-center">
    <div class="row">
      <div class="col columna-grilla">
        <div class="carta">
          <div class="contenedor-imagen-pokemon">
            <img src="" class="imagen-carta" alt="" />
          </div>

          <div class="contenedor-info-pokemon">
            <div class="contenedor-id-pokemon">
              <p class="numero-identificacion-pokemon"></p>
            </div>

            <div class="contenedor-nombre-pokemon">
              <h5 class="nombre-pokemon">...</h5>
            </div>
          </div>
          <div class="contenedor-tipos-pokemon">
            <div class="contenedor-tipo">
              <img src="" class="primer-tipo imagen-tipos" />
            </div>
            <div class="contenedor-tipo">
              <img src="" class="segundo-tipo imagen-tipos" />
            </div>
          </div>
        </div>
      </div>
      <div class="col columna-grilla">
        <div class="carta">
          <div class="contenedor-imagen-pokemon">
            <img src="" class="imagen-carta" alt="" />
          </div>
          <div class="contenedor-info-pokemon">
            <div class="contenedor-id-pokemon">
              <p class="numero-identificacion-pokemon"></p>
            </div>
            <div class="contenedor-nombre-pokemon">
              <h5 class="nombre-pokemon">...</h5>
            </div>
          </div>

          <div class="contenedor-tipos-pokemon">
            <div class="contenedor-tipo">
              <img src="" class="primer-tipo imagen-tipos" />
            </div>
            <div class="contenedor-tipo">
              <img src="" class="segundo-tipo imagen-tipos" />
            </div>
          </div>
        </div>
      </div>
      <div class="col columna-grilla">
        <div class="carta">
          <div class="contenedor-imagen-pokemon">
            <img src="" class="imagen-carta" alt="" />
          </div>
          <div class="contenedor-info-pokemon">
            <div class="contenedor-id-pokemon">
              <p class="numero-identificacion-pokemon"></p>
            </div>
            <div class="contenedor-nombre-pokemon">
              <h5 class="nombre-pokemon">...</h5>
            </div>
          </div>

          <div class="contenedor-tipos-pokemon">
            <div class="contenedor-tipo">
              <img src="" class="primer-tipo imagen-tipos" />
            </div>
            <div class="contenedor-tipo">
              <img src="" class="segundo-tipo imagen-tipos" />
            </div>
          </div>
        </div>
      </div>
      <div class="col columna-grilla">
        <div class="carta">
          <div class="contenedor-imagen-pokemon">
            <img src="" class="imagen-carta" alt="" />
          </div>
          <div class="contenedor-info-pokemon">
            <div class="contenedor-id-pokemon">
              <p class="numero-identificacion-pokemon"></p>
            </div>
            <div class="contenedor-nombre-pokemon">
              <h5 class="nombre-pokemon">...</h5>
            </div>
          </div>

          <div class="contenedor-tipos-pokemon">
            <div class="contenedor-tipo">
              <img src="" class="primer-tipo imagen-tipos" />
            </div>
            <div class="contenedor-tipo">
              <img src="" class="segundo-tipo imagen-tipos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contenedor-cambio-pagina">
    <nav aria-label="Page navigation example">
      <ul class="pagination paginador">
        <li class="page-item indicador-estado-anterior disabled">
          <a class="page-link boton-anterior-pagina" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item pagina-item active"><a class="page-link indicador-pagina">5</a></li>
        <li class="page-item pagina-item"><a class="page-link indicador-pagina">6</a></li>
        <li class="page-item pagina-item"><a class="page-link indicador-pagina">7</a></li>
        <li class="page-item indicador-estado-siguiente">
          <a class="page-link boton-siguiente-pagina" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>

<div class="col pattern-diagonal-stripes-lg columna-decoracion"></div>
</div>

<div class="pantalla-de-carga" id="">
  <p>Cargando...</p>
</div>`;