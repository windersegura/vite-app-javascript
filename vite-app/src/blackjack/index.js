import _ from 'underscore';
// import { crearDeck as crearNuevoDeck } from './usecases/crear-deck';
import { pedirCarta, crearDeck, valorCarta } from './usecases';

const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  //Referencias del Html
  const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevoJuego = document.querySelector("#btnNuevo");

  const puntosHtml = document.querySelectorAll("small"),
        divCartasJugadores = document.querySelectorAll(".divCartas");


  //Esta funcion inicializa el juego 
  const inicializarJuego = ( numJugadores = 2 ) =>{
    deck = crearDeck( tipos,especiales );
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);  
    }

    puntosHtml.forEach( elem => elem.innerText = 0 );
    divCartasJugadores.forEach( elem => elem.innerText ='');

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  }


  // Turno: 0 = Primer Jugador y el ultimo sera la computadora
  const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = ( carta, turno ) => {

      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () =>{
    const[ puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie Gana");
      } else if (puntosMinimos > 21) {
        alert("Computadora Gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador Gana");
      } else {
        alert("Computadora Gana");
      }
    }, 100);
  }

  //Turno cumputadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta( deck );

      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

      crearCarta(carta, puntosJugadores.length - 1);

    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
    
  };

  //Eventos
  btnPedir.addEventListener("click", function () {
    const carta = pedirCarta( deck );

    const puntosJugador = acumularPuntos( carta, 0)

    crearCarta( carta, 0);

    if (puntosJugador > 21) {
      console.warn('Lo siento mucho, perdiste');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn('21, genial!');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", function () {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevoJuego.addEventListener("click", () => {
    inicializarJuego();
    
  });


})();

