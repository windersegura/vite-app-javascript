
/**
 * Esta funcion devuelve una carta del deck 
 * @param {Array<String>} deck 
 * @returns {String} retorna carta pedida.
 */

export const pedirCarta = ( deck ) => {
    
    if (!deck || deck.length == 0) {
      throw "No hay Cartas en el Deck";
    }
    return deck.pop();
  };
