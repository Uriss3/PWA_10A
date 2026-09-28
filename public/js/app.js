// imports
import { db } from "./guitarras.js";

// variables
const container = document.querySelector("h2 + div");

console.log(container);

// funciones
function createCard(guitar) {
    const div = document.createElement("div");

    div.classList = "col-md-6 col-lg-4 my-4 row align-items-center";

    const html = `
        <div class="row mt-5">
            <div class="col-4">
                <img 
                    class="img-fluid" 
                    src="./public/img/${guitar.imagen}.jpg" 
                    alt="imagen guitarra"
                >
            </div>

            <div class="col-8">
                <h3 class="text-black fs-4 fw-bold text-uppercase">
                    ${guitar.nombre}
                </h3>

                <p>
                    ${guitar.descripcion}
                </p>

                <p class="fw-black text-primary fs-3">
                    $${guitar.precio}
                </p>

                <button 
                    type="button"
                    class="btn btn-dark w-100"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;

    div.innerHTML = html;

    return div;
}

// recorrer el arreglo
db.forEach(guitar => {
    container.appendChild(createCard(guitar));
});

// listeners