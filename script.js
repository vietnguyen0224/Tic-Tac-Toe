let board = document.getElementById('gameBoard-container');

const WinningConditions = [
    ['00', '01', '02'],
    ['10', '11', '12'],
    ['20', '21', '22'],
    ['00', '10', '20'],
    ['01', '11', '21'],
    ['02', '12', '22'],
    ['00', '11', '22'],
    ['02', '11', '20']
];

//the close button that closes the popup
document.getElementsByClassName('close')[0].addEventListener('click', () => {
    popup.style.display = "none";
    restart();
});

function restart() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.firstChild) cell.removeChild(cell.firstChild);
        cell.classList.toggle('player2');
        cell.classList.toggle('player1');
    })
    player1.CellsTaken.length = 0;
    player2.CellsTaken.length = 0;
    displayPlayer();
};

function togglePlayer() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.toggle('player2');
        cell.classList.toggle('player1');
    })
    displayPlayer();
};

function displayPlayer() {
    let playerName = document.getElementById('playerName');
    if (playerName.textContent.localeCompare('Player 1') === 0) {
        playerName.textContent = 'Player 2';
    }
    else {
        playerName.textContent = 'Player 1';
    }
};

function win(cellsTaken) {
    WinningConditions.forEach(condition => {
        let count = 0;
        for (let i = 0; i < condition.length; i++) {
            if (cellsTaken.includes(condition[i])) count++
        }
        if (count === condition.length) {
            document.getElementById('popup').style.display = "block";
            let winner = document.getElementById('winner');
            if (document.querySelector('.player1')) {
                winner.textContent = 'Player 2'
            }
            else {
                winner.textContent = 'Player 1';
            }
        }
    })  
};

const Player = (img) => {
    const CellsTaken = [];

    const takesCell = (cell, bg) => {
        CellsTaken.push(cell.id);
        bg.setAttribute('src', img);
        bg.style.display = 'inline';
        bg.style.opacity = '0.6';
    }
    return {CellsTaken, takesCell};
};

const gameBoard = (() => {
    const gameBoard = [[,,,],[,,,],[,,,]];
    let _board = document.createElement('div');
    _board.setAttribute('class', 'gameBoard');

    const play = (event) => {
        // If a cell is taken, icon will be background 
        if (!event.target.classList.contains('cell')) {
            return;
        }
        let cell = event.target;
        let bg = document.createElement('img');
        
        if (event.target.classList.contains('player2')) {
            player2.takesCell(cell, bg);
            togglePlayer();
        }
        else {
            player1.takesCell(cell, bg);
            togglePlayer();
        }
        cell.appendChild(bg);
        if (player1.CellsTaken.length >= 3) {
            win(player1.CellsTaken);
        }
        if (player2.CellsTaken.length >= 3) {
            win(player2.CellsTaken);    
        }
    }

    const render = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                let cell = document.createElement('div');

                cell.setAttribute('id', `${i}${j}`);
                cell.classList.add('cell', 'player1');
                cell.addEventListener('click', (event) => play(event));

                _board.appendChild(cell);
            }
        }
        return _board;
    }                   
    return {
        render
    };                 
})();

const player1 = Player('./icons/pistol.svg');
const player2 = Player('./icons/sword.svg');
board.appendChild(gameBoard.render());