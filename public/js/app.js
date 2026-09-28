// imports
import { db } from "./guitarras.js";

// variables
const container = document.querySelector("h2 + div");
const divCarrito = document.querySelector('#carrito');
let carrito = [];

// funciones
function createCard(guitar) {
    const div = document.createElement("div");
    div.classList = 'col-md-6 col-lg-4 my-4 row align-items-center';
    
    const html = `
    <div class="col-4">
        <img class="img-fluid" src="./public/img/${guitar.imagen}.jpg" alt="imagen ${guitar.nombre}">
    </div>
    <div class="col-8">
        <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
        <p>${guitar.description}</p>
        <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
        <button 
            data-id="${guitar.id}"
            type="button"
            class="btn btn-dark w-100"
        >Agregar al Carrito</button>
    </div>`;
    
    div.innerHTML = html;
    return div;
}

function drawCar() {
    const div = document.createElement('div');
    
    if (carrito.length === 0) {
        div.innerHTML = '<p class="text-center">El carrito esta vacio</p>';
    } else {
        let html = `<table class="w-100 table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>`;
        
        carrito.forEach(guitar => {
            html += `<tr>
                        <td>
                            <img class="img-fluid" src="./public/img/${guitar.imagen}.jpg" alt="imagen ${guitar.nombre}">
                        </td>
                        <td>${guitar.nombre}</td>
                        <td class="fw-bold">
                            $${guitar.precio}
                        </td>
                        <td class="flex align-items-start gap-4">
                            <button type="button" class="btn btn-dark">-</button>
                            ${guitar.cantidad}
                            <button type="button" class="btn btn-dark">+</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" type="button">X</button>
                        </td>
                    </tr>`;
        });

        // Calculamos el total dinámicamente sumando (precio * cantidad) de cada producto
        const totalPagar = carrito.reduce((total, guitar) => total + (guitar.precio * guitar.cantidad), 0);

        html += `   </tbody>
                </table>
                <p class="text-end">Total pagar: <span class="fw-bold">$${totalPagar}</span></p>
                <button class="btn btn-dark w-100 mt-3 p-2 vaciar-carrito">Vaciar Carrito</button>`;
        
        div.innerHTML = html;
    }
    
    divCarrito.innerHTML = '';
    divCarrito.appendChild(div);
}

function getGuitar(e) {
    if (e.target.classList.contains("btn")) {
        const id = e.target.getAttribute('data-id');
        const idSelected = db.findIndex(g => g.id === Number(id));
        const idInCart = carrito.findIndex(gInCart => gInCart.id === Number(id));

        if (idInCart === -1) {
            carrito.push({ ...db[idSelected], cantidad: 1 });
        } else {
            carrito[idInCart].cantidad++;
        }
        drawCar();
    }
}

// recorrer el arreglo de la tienda
db.forEach(guitar => {
    container.appendChild(createCard(guitar));
});

drawCar();

// listeners
container.addEventListener('click', getGuitar);

// Listener para el carrito (Vaciar carrito)
divCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('vaciar-carrito')) {
        carrito = [];
        drawCar();
    }
});