const gameBoard = (() => {

    const boardArray = ['', '', '', '', '', '', '', '', '']
    const tiles = document.querySelectorAll('.tiles')

    return {
        boardArray,
        tiles,
    };

})();

const gamePlay = (() => {

    function getPlayerTurn() {
        let currentPlayer;
        const player1Array = gameBoard.boardArray.filter(a => a.includes('x'));
        const player2Array = gameBoard.boardArray.filter(a => a.includes('o'));
        if (player1Array.length === player2Array.length) {
            currentPlayer = Player1;
        } else if (player1Array.length > player2Array.length) {
            currentPlayer = Player2;
        }
        return currentPlayer.token;
    }

    function placeToken(e) {
        const position = this.dataset.key;
        if (gameBoard.boardArray[position-1] === '') {
        gameBoard.boardArray.splice(position-1, 1, getPlayerTurn());
        displayController.updateDisplay();
        };
    };

    gameBoard.tiles.forEach(tiles => tiles.addEventListener('click', placeToken));

})();

const displayController = (() => {

    const updateDisplay = () => {
    for (let i = 0; i < gameBoard.boardArray.length; i++) {
        gameBoard.tiles[i].innerText = gameBoard.boardArray[i];
    }};

    return {
        updateDisplay,
    }

})();

const players = (name, token) => {
    return {name, token};
}


//Temporarily in global scope to make building application easier
const Player1 = players('Player 1', 'x');
const Player2 = players('Player 2', 'o');