let board = document.getElementById('gameBoard-container');

const gameBoard = (() => {
    const _gameBoard = [[,,,],[,,,],[,,,]];
    let _board = document.createElement('div');
    _board.setAttribute('class', 'gameBoard');

    const play = (event) => {
        // If a cell is taken, icon will be background 
        if (!event.target.classList.contains('cell')) {
            return;
        }
        let cell = event.target;
        let img = document.createElement('img');
        
        img.setAttribute('src', './icons/pistol.svg');
        img.style.display = 'inline';
        cell.appendChild(img);
    }

    const render = () => {
        for (let i = 0; i < _gameBoard.length; i++) {
            for (let j = 0; j < _gameBoard[i].length; j++) {
                let cell = document.createElement('div');

                cell.setAttribute('id', `cell-${i}${j}`);
                cell.classList.add('cell', 'player1');
                cell.addEventListener('click', (event) => play(event));

                _board.appendChild(cell);
            }
        }
        return _board;
    }                   
    return {
        render,
    };                 
})();

const displayController = (() => {

})();

const Player = () => {

};

function togglePlayer() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.toggle('player2');
    })

    let playerName = document.getElementById('playerName');
    if (playerName.textContent.localeCompare('Player 1') === 0) {
        playerName.textContent = 'Player 2';
    }
    else {
        playerName.textContent = 'Player 1';
    }
}

board.appendChild(gameBoard.render());