document.addEventListener("DOMContentLoaded", () => {
    const startXBtn = document.querySelector('.start1');
    const startOBtn = document.querySelector('.start2');
    const restartBtn = document.querySelector('.end');
    const boxes = document.querySelectorAll('.img1, .img2, .img3, .img4, .img5, .img6, .img7, .img8, .img9');
    let currentPlayer = '';
    let gameBoard = Array(9).fill(null);

    startXBtn.addEventListener('click', () => startGame('X'));
    startOBtn.addEventListener('click', () => startGame('O'));

    function startGame(player) {
        currentPlayer = player;
        gameBoard.fill(null);
        boxes.forEach(box => {
            box.textContent = '';
            box.disabled = false;
        });
        startXBtn.disabled = true;
        startOBtn.disabled = true;
        restartBtn.disabled = false;
    }

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (!box.textContent && currentPlayer) {
                box.textContent = currentPlayer;
                gameBoard[index] = currentPlayer;
                if (checkWinner(currentPlayer)) {
                    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                    disableBoard();
                } else if (gameBoard.every(cell => cell !== null)) {
                    setTimeout(() => alert("It's a draw!"), 100);
                    disableBoard();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    function checkWinner(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some(combination =>
            combination.every(index => gameBoard[index] === player)
        );
    }

    function disableBoard() {
        boxes.forEach(box => box.disabled = true);
    }

    restartBtn.addEventListener('click', () => {
        gameBoard.fill(null);
        boxes.forEach(box => {
            box.textContent = '';
            box.disabled = false;
        });
        startXBtn.disabled = false;
        startOBtn.disabled = false;
        restartBtn.disabled = true;
    });
});
