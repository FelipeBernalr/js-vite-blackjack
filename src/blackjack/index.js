
import _ from 'underscore';
import {crearDeck,pedirCarta,valorCarta,turnoComputadora,crearCartaHtml} from './usecase/index'

/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

 let  deck              = [],
      puntosJugador     = 0,
      puntosComputadora = 0;
const tipos             = ['C','D','H','S'],
      especiales        = ['A','J','Q','K'];


const btnPedir             = document.querySelector('#btnPedir'),
      btnDetener           = document.querySelector('#btnDetener'),
      btnNuevo             = document.querySelector('#btnNuevo'),
      divCartasJugador     = document.querySelector('#jugador-cartas'),
      divCartasComputadora = document.querySelector('#computadora-cartas'),
      puntosHTML           = document.querySelectorAll('small');


    deck = crearDeck(tipos,especiales);

    // Eventos

    btnPedir.addEventListener('click', () => {
    const carta             = pedirCarta(deck);
    puntosJugador           = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;
    
    const imgCarta          = crearCartaHtml(carta)
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador , puntosHTML[1] , divCartasComputadora , deck );

    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora , deck );
    }

});

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora, deck );
    });

    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck(tipos,especiales);

        puntosJugador     = 0;
        puntosComputadora = 0;
        
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    });