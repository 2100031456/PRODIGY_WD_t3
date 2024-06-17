// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const messageElement = document.getElementById('message');
    const board = document.getElementById('board');

    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const index = event.target.getAttribute('data-index');

        if (boardState[index] || !isGameActive) {
            return;
        }

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            isGameActive = false;
            messageElement.textContent = `${currentPlayer} wins!`;
            return;
        }

        if (boardState.every(cell => cell)) {
            isGameActive = false;
            messageElement.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function restartGame() {
        boardState.fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = 'X';
        isGameActive = true;
        messageElement.textContent = '';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
