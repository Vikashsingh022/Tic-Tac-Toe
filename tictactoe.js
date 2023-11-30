document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes("") ? null : "T";
    };

    const handleCellClick = (index) => {
        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].innerText = currentPlayer;

            const winner = checkWinner();

            if (winner) {
                if (winner === "T") {
                    status.innerText = "It's a Tie!";
                } else {
                    status.innerText = `${winner} Wins!`;
                }
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.innerText = `Current Player: ${currentPlayer}`;
            }
        }
    };

    const handleCellHover = (index) => {
        if (gameBoard[index] === "" && gameActive) {
            cells[index].style.backgroundColor = "#ccc";
        }
    };

    const handleCellLeave = (index) => {
        if (gameBoard[index] === "" && gameActive) {
            cells[index].style.backgroundColor = "#ddd";
        }
    };

    const resetGame = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        status.innerText = "Current Player: X";

        cells.forEach((cell) => {
            cell.innerText = "";
            cell.style.backgroundColor = "#ddd";
        });
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
        cell.addEventListener("mouseover", () => handleCellHover(index));
        cell.addEventListener("mouseleave", () => handleCellLeave(index));
    });

    resetButton.addEventListener("click", resetGame);
});
