"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function () {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');

    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}


oGameData.checkHorizontal = function () {
    for (let row = 0; row < 3; row++) {
        if (oGameData.gameField[row * 3] !== '' &&
            oGameData.gameField[row * 3] == oGameData.gameField[row * 3 + 1] &&
            oGameData.gameField[row * 3 + 1] === oGameData.gameField[row * 3 + 2]) {
            //returnerar vinnaren
            if (oGameData.gameField[row * 3] === oGameData.PlayerOne)
                return 1;
        } else {
            return 2;
        }
    }

    return 0;
}

oGameData.checkVertical = function () {
    for (let col = 0; col < 3; col++) {
        if (oGameData.gameField[col] !== '' &&
            oGameData.gameField[col] === oGameData.gameField[col + 3] &&
            oGameData.gameField[col + 3] === oGameData.gameField[col + 6]) {
            if (oGameData.gameField[col] === oGameData.playerOne) {
                return 1;
            } else {
                return 2;
            }
        }


    }
    // om ingen vinnare hittas vertikalt 
    return 0;
}

oGameData.checkDiagonalLeftToRight = function () {
    if (oGameData.gameField[0] !== '' &&
        oGameData.gameField[0] === oGameData.gameField[4] &&
        oGameData.gameField[4] === oGameData.gameField[8]) {
        if (oGameData.gameField[0] === oGameData.playerOne) {
            return 1;
        } else {
            return 2;
        }
    }
    return 0;
}

oGameData.checkDiagonalRightToLeft = function () {
    if (oGameData.gameField[2] !== '' &&
        oGameData.gameField[2] === oGameData.gameField[4] &&
        oGameData.gameField[4] === oGameData.gameField[6]) {
        if (oGameData.gameField[2] === oGameData.playerOne) {
            return 1;
        } else {
            return 2;
        }
    }
    return 0;
}

oGameData.checkForDraw = function () {
    for (let i = 0; i < 9; i++) {
        if (oGameData.gameField[i] === '') {
            return 0;
        }
    }
    return 3;
}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function () {
    let winner = 0;
    winner = oGameData.checkHorizontal();
    if (winner === 0) {
        winner = oGameData.checkVertical();
    }
    if (winner === 0) {
        winner = oGameData.checkDiagonalLeftToRight();
    }
    if (winner === 0) {
        winner = oGameData.checkDiagonalRightToLeft();
    }
    if (winner === 0) {
        winner = oGameData.checkForDraw();
    }
    return winner;
}

//Testutskrifter

console.log(oGameData);
oGameData.initGlobalObject();
console.log(oGameData.gameField);
console.log(oGameData.checkForGameOver());

console.log(oGameData.checkHorizontal());
console.log(oGameData.checkVertical());
console.log(oGameData.checkDiagonalLeftToRight());
console.log(oGameData.checkDiagonalRightToLeft());
console.log(oGameData.checkForDraw());