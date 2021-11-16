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
        const player1Array = gameBoard.boardArray.filter(a => a.includes(Player1.token));
        const player2Array = gameBoard.boardArray.filter(b => b.includes(Player2.token));
        if (player1Array.length === player2Array.length) {
            currentPlayer = Player1;
        } else if (player1Array.length > player2Array.length) {
            currentPlayer = Player2;
        } else if (player2Array.length === 5)
        console.log(player2Array.length)
        return currentPlayer.token;
    };

    function placeToken(e) {
        const position = this.dataset.key;
        if (gameBoard.boardArray[position-1] === '') {
        gameBoard.boardArray.splice(position-1, 1, getPlayerTurn());
        displayController.updateDisplay();
        checkForResult()
        }
    };

    function checkForResult() {
        let board = gameBoard.boardArray.slice();

        let win = [
        board[0] + board[1] + board[2],
        board[3] + board[4] + board[5],
        board[6] + board[7] + board[8],
        board[0] + board[3] + board[6],
        board[1] + board[4] + board[7],
        board[2] + board[5] + board[8],
        board[0] + board[4] + board[8],
        board[2] + board[4] + board[6],
        ]
        
        let a = Player1.token
        let b = Player2.token
        let player1Array = gameBoard.boardArray.filter(a => a.includes(Player1.token));
        for (let i = 0; i < win.length; i++) {
            if (win[i] === a+a+a) {
                console.log(Player1.name + ' wins!');
                endGame();
            } else if (win[i] === b+b+b) {
                console.log(Player2.name + ' wins!');
                endGame();
            } else if (player1Array.length === 5) {
                console.log('Tie game');
                endGame();
                return;
            }
        }

    };

    function endGame() {
        const gameBoardContainer = document.getElementById('game-board-container');
        gameBoardContainer.classList.toggle('disabled');
    }

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