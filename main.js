import './sass/main.scss';
import Handlebars from 'handlebars';

const start = async () => {
  try {
    /* 1. Obtención de la plantilla */
    const respuesta = await fetch('templates/card.hbs');

    if (!respuesta.ok) {
      throw new Error('No se pudo obtener la plantilla');
    }

    const plantilla = await respuesta.text();

    const template = Handlebars.compile(plantilla);

    const respuestaBack = await fetch(
      'https://66b238061ca8ad33d4f6fda8.mockapi.io/productos',
    );

    if (!respuestaBack.ok) {
      throw new Error('Algo paso con los productos', respuestaBack.status);
    }

    const dataProductos = await respuestaBack.json();
    const data = { productos: dataProductos };
    const html = template(data);

    console.log(html);

    const contenedorCards = document.querySelector('#contenedor-cards');

    contenedorCards.innerHTML = html;
  } catch (error) {
    console.log('[start]:', error);
  }
};

window.addEventListener('DOMContentLoaded', start);
