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
        const player1Array = gameBoard.boardArray.filter(a => a.includes(player1.token));
        const player2Array = gameBoard.boardArray.filter(b => b.includes(player2.token));
        if (player1Array.length === player2Array.length) {
            currentPlayer = player1;
        } else if (player1Array.length > player2Array.length) {
            currentPlayer = player2;
        }
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
        
        let a = player1.token
        let b = player2.token
        let player1Array = gameBoard.boardArray.filter(a => a.includes(player1.token));
        for (let i = 0; i < win.length; i++) {
            if (win[i] === a+a+a) {
                endGame(player1.name + ' wins!');
                return;
            } else if (win[i] === b+b+b) {
                endGame(player2.name + ' wins!');
                return;
            } else if ((player1Array.length === 5) && (i === 7)) {
                endGame('Tie Game');
            }
        }
    };

    function endGame(msg) {
        const gameBoardContainer = document.getElementById('game-board-container');
        gameBoardContainer.classList.toggle('disabled');

        const main = document.getElementById('main')

        let announcement = document.createElement('div');
        announcement.innerText = msg;
        announcement.classList.add('announcement');
        main.appendChild(announcement);

        let restartBtn = document.createElement('button');
        restartBtn.innerText = 'New Game?';
        restartBtn.classList.add('restart-button');
        main.appendChild(restartBtn);
        restartBtn.addEventListener('click', resetGame);
    }

    function resetGame() {
        let announcement = document.querySelector('.announcement');
        let restartBtn = document.querySelector('.restart-button');
        announcement.remove();
        restartBtn.remove();
        
        document.getElementById('game-board-container').classList.toggle('disabled');
        gameBoard.boardArray.fill('');
        displayController.updateDisplay();
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
const player1 = players('Player 1', 'x');
const player2 = players('Player 2', 'o');