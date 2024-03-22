"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

function initiateGame() {
    const form = document.querySelector("form");
    form.classList.add("d-none");

    const gameArea = document.getElementById("game-area");
    gameArea.classList.remove("d-none");

    const errorElement = document.getElementById("errorMsg");
    removeAllChildren(errorElement);

    oGameData.nickNamePlayerOne = document.getElementById("nick1").value;
    oGameData.nickNamePlayerTwo = document.getElementById("nick2").value;
    oGameData.colorPlayerOne = document.getElementById("color1").value;
    oGameData.colorPlayerTwo = document.getElementById("color2").value;

    const allTiles = gameArea.querySelectorAll("td");

    allTiles.forEach((tile, _) => {
        tile.textContent = "";
        tile.style.backgroundColor = "white";
    });

    let playerChar
    let playerName

    const randomNumber = Math.round(Math.random());

    if (randomNumber === 0) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    const jumbotronText = document.querySelector(".jumbotron").querySelector("h1");
    const jumbotronTextNode = document.createTextNode(`Aktuell spelare är ${playerName}`);

    removeAllChildren(jumbotronText); // Tar bort all text i jumbotron
    jumbotronText.appendChild(jumbotronTextNode);
}

function removeAllChildren(element) {
    while (element.firstChild) { // Genererat av Co-pilot, Lopen körs medans elementet har barn och tar bort första barnet
        element.removeChild(element.firstChild);
    }
}

function validateForm() {
    const MIN_NICKNAME_LENGTH = 5;

    const Nickname1 = document.getElementById("nick1")
    const Nickname2 = document.getElementById("nick2")
    const Color1 = document.getElementById("color1")
    const Color2 = document.getElementById("color2")

    try {
        if (Nickname1.value.length < MIN_NICKNAME_LENGTH || Nickname2.value.length < MIN_NICKNAME_LENGTH) {
            throw new Error("Namnet måste vara minst 5 tecken långt.");
        } else if (Nickname1.value === Nickname2.value) {
            throw new Error("Namnen får inte vara samma.");
        } else if (Color1.value === Color2.value) {
            throw new Error("Färgerna får inte vara samma.");
        } else if (Color1.value === "#000000" || Color2.value === "#000000") {
            throw new Error("Färgen får inte vara svart.");
        } else if (Color1.value === "#ffffff" || Color2.value === "#ffffff") {
            throw new Error("Färgen får inte vara vit.");
        }
        initiateGame();
    } catch (error) {
        const errorElement = document.getElementById("errorMsg");
        const textNode = document.createTextNode(error.message);

        removeAllChildren(errorElement);

        errorElement.appendChild(textNode);
    }
}

function startGamePressed(e) {
    validateForm();
}

function loadGame() {
    const gameArea = document.getElementById("game-area");
    const startGameButton = document.getElementById("newGame");

    gameArea.classList.add("d-none");

    startGameButton.addEventListener("click", startGamePressed);
    oGameData.initGlobalObject();
}

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function () {
    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array("", "", "", "", "", "", "", "", "");

    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array("X", "", "", "X", "", "", "X", "", "");
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    oGameData.gameField = Array('', '', '', 'X', 'X', 'X', '', '', '');

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
};

oGameData.checkHorizontal = function () {
    for (let row = 0; row < 3; row++) {
        if (
            oGameData.gameField[row * 3] !== "" &&
            oGameData.gameField[row * 3] == oGameData.gameField[row * 3 + 1] &&
            oGameData.gameField[row * 3 + 1] === oGameData.gameField[row * 3 + 2]
        ) {
            //returnerar vinnaren
            if (oGameData.gameField[row * 3] === oGameData.playerOne) {
                return 1;
            } else {
                return 2;
            }
        }
    }
    return 0;
};

oGameData.checkVertical = function () {
    for (let col = 0; col < 3; col++) {
        if (
            oGameData.gameField[col] !== "" &&
            oGameData.gameField[col] === oGameData.gameField[col + 3] &&
            oGameData.gameField[col + 3] === oGameData.gameField[col + 6]
        ) {
            if (oGameData.gameField[col] === oGameData.playerOne) {
                return 1;
            } else {
                return 2;
            }
        }
    }
    // om ingen vinnare hittas vertikalt
    return 0;
};

oGameData.checkDiagonalLeftToRight = function () {
    if (
        oGameData.gameField[0] !== "" &&
        oGameData.gameField[0] === oGameData.gameField[4] &&
        oGameData.gameField[4] === oGameData.gameField[8]
    ) {
        if (oGameData.gameField[0] === oGameData.playerOne) {
            return 1;
        } else {
            return 2;
        }
    }
    return 0;
};

oGameData.checkDiagonalRightToLeft = function () {
    if (
        oGameData.gameField[2] !== "" &&
        oGameData.gameField[2] === oGameData.gameField[4] &&
        oGameData.gameField[4] === oGameData.gameField[6]
    ) {
        if (oGameData.gameField[2] === oGameData.playerOne) {
            return 1;
        } else {
            return 2;
        }
    }
    return 0;
};

oGameData.checkForDraw = function () {
    for (let i = 0; i < 9; i++) {
        if (oGameData.gameField[i] === "") {
            return 0;
        }
    }
    return 3;
};

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
};

window.addEventListener("load", loadGame);

//Testutskrifter

//console.log(oGameData);
//console.log(oGameData.gameField);
//console.log(oGameData.checkForGameOver());

//console.log(oGameData.checkHorizontal());
//console.log(oGameData.checkVertical());
//console.log(oGameData.checkDiagonalLeftToRight());
//console.log(oGameData.checkDiagonalRightToLeft());
//console.log(oGameData.checkForDraw());
