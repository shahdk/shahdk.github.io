/*----------- Game State Data ----------*/
let p1Board = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];
let p1Score = 0;
let p1Moves = [];
let p1NegativeScore = 0;

let p2Board = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];
let p2Score = 0;
let p2Moves = [];
let p2NegativeScore = 0;

let p3Board = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];
let p3Score = 0;
let p3Moves = [];
let p3NegativeScore = 0;

let p4Board = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];
let p4Score = 0;
let p4Moves = [];
let p4NegativeScore = 0;


/*---------- Cached Variables ----------*/

// DOM referenes

let blackPieces = document.querySelectorAll(".black-tile");
let redPieces = document.querySelectorAll(".red-tile");
let yellowPieces = document.querySelectorAll(".yellow-tile");
let whitePieces = document.querySelectorAll(".white-tile");
let bluePieces = document.querySelectorAll(".blue-tile");
let negative = document.querySelectorAll(".negative");


/*---------- Event Listeners ----------*/

// initialize event listeners on pieces
function givePiecesEventListeners() {
    for (let i = 0; i < blackPieces.length; i++) {
        blackPieces[i].addEventListener("click", selectTile);
    }
    for (let i = 0; i < bluePieces.length; i++) {
        bluePieces[i].addEventListener("click", selectTile);
    }
    for (let i = 0; i < yellowPieces.length; i++) {
        yellowPieces[i].addEventListener("click", selectTile);
    }
    for (let i = 0; i < whitePieces.length; i++) {
        whitePieces[i].addEventListener("click", selectTile);
    }
    for (let i = 0; i < redPieces.length; i++) {
        redPieces[i].addEventListener("click", selectTile);
    }
    for (let i = 0; i < negative.length; i++) {
        negative[i].addEventListener("click", selectNegative);
    }
}

/*---------- Logic ----------*/

function reset() {
    let scores = document.querySelectorAll(".score");
    for (let i = 0; i < scores.length; i++) {
        scores[i].innerHTML = '0';
    }
    for (let i = 0; i < blackPieces.length; i++) {
        blackPieces[i].classList.remove('selected');
        blackPieces[i].innerHTML = '';
    }
    for (let i = 0; i < bluePieces.length; i++) {
        bluePieces[i].classList.remove('selected');
        bluePieces[i].innerHTML = '';
    }
    for (let i = 0; i < yellowPieces.length; i++) {
        yellowPieces[i].classList.remove('selected');
        yellowPieces[i].innerHTML = '';
    }
    for (let i = 0; i < whitePieces.length; i++) {
        whitePieces[i].classList.remove('selected');
        whitePieces[i].innerHTML = '';
    }
    for (let i = 0; i < redPieces.length; i++) {
        redPieces[i].classList.remove('selected');
        redPieces[i].innerHTML = '';
    }

    p1Board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    p1Score = 0;
    p1Moves = [];
    p1NegativeScore = 0;

    p2Board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    p2Score = 0;
    p2Moves = [];
    p2NegativeScore = 0;

    p3Board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    p3Score = 0;
    p3Moves = [];
    p3NegativeScore = 0;

    p4Board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    p4Score = 0;
    p4Moves = [];
    p4NegativeScore = 0;

    let negativeScores = document.querySelectorAll(".negative-score-p1,.negative-score-p2,.negative-score-p3,.negative-score-p4");
    for (let i = 0; i < negativeScores.length; i++) {
        negativeScores[i].innerHTML = 0;
    }
}

function selectTile() {
    const eleId = event.srcElement.id.split("-");
    const player = eleId[0];
    const row = parseInt(eleId[1]);
    const col = parseInt(eleId[2]);
    let color = '';
    let scoreToUpdate = 0;
    const cList = Array.from(event.srcElement.classList);

    if (event.srcElement.classList.contains('selected')) {
        if (player == "p1") {
            scoreToUpdate = undoScore(p1Moves, player, row, col, p1Board)
        }
        if (player == "p2") {
            scoreToUpdate = undoScore(p2Moves, player, row, col, p2Board)
        }
        if (player == "p3") {
            scoreToUpdate = undoScore(p3Moves, player, row, col, p3Board)
        }
        if (player == "p4") {
            scoreToUpdate = undoScore(p4Moves, player, row, col, p4Board)
        }
        if (scoreToUpdate < 0) {
            event.srcElement.classList.remove('selected');
        } else {
            return;
        }
    } else {
        event.srcElement.classList.add('selected');
        color = Array.from(event.srcElement.classList).find(s => s.toString().includes("-tile"));

        if (player == "p1") {
            scoreToUpdate = scoreToUpdate + calculateScore(p1Board, color, row, col);
            p1Moves.push(event.srcElement.id + "-" + scoreToUpdate)
        }
        if (player == "p2"){
            scoreToUpdate = scoreToUpdate + calculateScore(p2Board, color, row, col);
            p2Moves.push(event.srcElement.id + "-" + scoreToUpdate)
        }
        if (player == "p3"){
            scoreToUpdate = scoreToUpdate + calculateScore(p3Board, color, row, col);
            p3Moves.push(event.srcElement.id + "-" + scoreToUpdate)
        }
        if (player == "p4"){
            scoreToUpdate = scoreToUpdate + calculateScore(p4Board, color, row, col);
            p4Moves.push(event.srcElement.id + "-" + scoreToUpdate)
        }
    }

    updateScore(scoreToUpdate);
    if (scoreToUpdate > 0) {
        event.srcElement.innerHTML = scoreToUpdate;
    } else {
        event.srcElement.innerHTML = '';
    }
}

function undoScore(moves, player, row, col, board) {
    let lastMove = moves.pop()
    const lastId = lastMove.split("-");
    const lastP = lastId[0];
    const lastR = parseInt(lastId[1]);
    const lastC = parseInt(lastId[2]);
    const lastS = parseInt(lastId[3]);

    if (player == lastP && row == lastR && col == lastC) {
        board[row][col] = '';
        return scoreToUpdate = -1 * lastS;
    } else {
        moves.push(lastMove);
        return 0;
    }
}

function calculateScore(board, color, row, col) {
    let scoreToUpdate = 0;

    board[row][col] = color;

    const currRowIndex = board[row].findIndex(s => s == '');
    const currColIndex = board.map(x => x[col]).findIndex(s => s == '');
    const currColors = board.map(x => x.find(s => s.includes(color))).findIndex(s => (typeof s == 'undefined') || (s == ''));

    const currRow = board[row];
    const currCol = board.map(x => x[col]);

    // Check for Row completion
    if (currRowIndex == -1) {
        scoreToUpdate = scoreToUpdate + 2;
    }

    // Check for Column completion
    if (currColIndex == -1) {
        scoreToUpdate = scoreToUpdate + 7;
    }

    // Check for color completion
    if (currColors == -1) {
        scoreToUpdate = scoreToUpdate + 10;
    }

    // Count for Continuous row
    const continuousRow = getContiguousTileCount(currRow, col)
    // Count for Continuous column
    const continuousCol = getContiguousTileCount(currCol, row)

    if (continuousRow == 0 && continuousCol == 0) {
        scoreToUpdate = scoreToUpdate + 1;
    }
    if (continuousRow > 0) {
        scoreToUpdate = scoreToUpdate + 1 + continuousRow;
    }
    if (continuousCol > 0) {
        scoreToUpdate = scoreToUpdate + 1 + continuousCol;
    }

    return scoreToUpdate;
}

function getContiguousTileCount(arr, idx) {
    let sum = 0;
    let left = idx - 1;
    let right = idx + 1;
    //Sum left
    while (left >= 0 && arr[left] != '') {
        sum = sum + 1;
        left = left - 1;
    }
    while (right < arr.length && arr[right] != '') {
        sum = sum + 1;
        right = right + 1;
    }
    return sum;
}

function selectNegative() {
    let scoreToUpdate = 0;
    if (event.srcElement.classList.contains('minus-1')) {
        scoreToUpdate = -1;
    }
    if (event.srcElement.classList.contains('plus-1')) {
        scoreToUpdate = 1;
    }

    const curr = document.querySelectorAll(".current");
    let isP1 = curr[0].classList.contains('p1');
    let isP2 = curr[0].classList.contains('p2');
    let isP3 = curr[0].classList.contains('p3');
    let isP4 = curr[0].classList.contains('p4');

    if (isP1) {
        p1NegativeScore = p1NegativeScore + scoreToUpdate;
        if (p1NegativeScore > 0) {
            p1NegativeScore = 0;
            scoreToUpdate = 0;
        }
        let negativeScores = document.querySelectorAll(".negative-score-p1");
        for (let i = 0; i < negativeScores.length; i++) {
            negativeScores[i].innerHTML = p1NegativeScore;
        }
    }
    if (isP2) {
        p2NegativeScore = p2NegativeScore + scoreToUpdate;
        if (p2NegativeScore > 0) {
            p2NegativeScore = 0;
            scoreToUpdate = 0;
        }
        let negativeScores = document.querySelectorAll(".negative-score-p2");
        for (let i = 0; i < negativeScores.length; i++) {
            negativeScores[i].innerHTML = p2NegativeScore;
        }
    }
    if (isP3) {
        p3NegativeScore = p3NegativeScore + scoreToUpdate;
        if (p3NegativeScore > 0) {
            p3NegativeScore = 0;
            scoreToUpdate = 0;
        }
        let negativeScores = document.querySelectorAll(".negative-score-p3");
        for (let i = 0; i < negativeScores.length; i++) {
            negativeScores[i].innerHTML = p3NegativeScore;
        }
    }
    if (isP4) {
        p4NegativeScore = p4NegativeScore + scoreToUpdate;
        if (p4NegativeScore > 0) {
            p4NegativeScore = 0;
            scoreToUpdate = 0;
        }
        let negativeScores = document.querySelectorAll(".negative-score-p4");
        for (let i = 0; i < negativeScores.length; i++) {
            negativeScores[i].innerHTML = p4NegativeScore;
        }
    }

    updateScore(scoreToUpdate);
}

function updateScore(amount) {
    const curr = document.querySelectorAll(".current");
    let isP1 = curr[0].classList.contains('p1');
    let isP2 = curr[0].classList.contains('p2');
    let isP3 = curr[0].classList.contains('p3');
    let isP4 = curr[0].classList.contains('p4');

    if (isP1) {
        p1Score = p1Score + amount;
        const scoreCard = document.querySelectorAll(".p1.score");
        scoreCard[0].textContent = p1Score;
        scoreCard[1].textContent = p1Score;
    }
    if (isP2) {
        p2Score = p2Score + amount;
        const scoreCard = document.querySelectorAll(".p2.score");
        scoreCard[0].textContent = p2Score;
        scoreCard[1].textContent = p2Score;
    }
    if (isP3) {
        p3Score = p3Score + amount;
        const scoreCard = document.querySelectorAll(".p3.score");
        scoreCard[0].textContent = p3Score;
        scoreCard[1].textContent = p3Score;
    }
    if (isP4) {
        p4Score = p4Score + amount;
        const scoreCard = document.querySelectorAll(".p4.score");
        scoreCard[0].textContent = p4Score;
        scoreCard[1].textContent = p4Score;
    }
}

function switchPlayer(isNext) {
    const curr = document.querySelectorAll(".current");
    let isP1 = curr[0].classList.contains('p1');
    let isP2 = curr[0].classList.contains('p2');
    let isP3 = curr[0].classList.contains('p3');
    let isP4 = curr[0].classList.contains('p4');

    for (let i = 0; i < curr.length; i++) {
        curr[i].classList.remove('current');
    }

    if (isP1) {
        if (isNext) {
            const p2 = document.getElementsByClassName("p2");
            for (let i = 0; i < p2.length; i++) {
                p2[i].classList.add('current');
            }
        } else {
            const p4 = document.getElementsByClassName("p4");
            for (let i = 0; i < p4.length; i++) {
                p4[i].classList.add('current');
            }
        }
    }
    if (isP2) {
        if (isNext) {
            const p3 = document.getElementsByClassName("p3");
            for (let i = 0; i < p3.length; i++) {
                p3[i].classList.add('current');
            }
        } else {
            const p1 = document.getElementsByClassName("p1");
            for (let i = 0; i < p1.length; i++) {
                p1[i].classList.add('current');
            }
        }
    }
    if (isP3) {
        if (isNext) {
            const p4 = document.getElementsByClassName("p4");
            for (let i = 0; i < p4.length; i++) {
                p4[i].classList.add('current');
            }
        } else {
            const p2 = document.getElementsByClassName("p2");
            for (let i = 0; i < p2.length; i++) {
                p2[i].classList.add('current');
            }
        }
    }
    if (isP4) {
        if (isNext) {
            const p1 = document.getElementsByClassName("p1");
            for (let i = 0; i < p1.length; i++) {
                p1[i].classList.add('current');
            }
        } else {
            const p3 = document.getElementsByClassName("p3");
            for (let i = 0; i < p3.length; i++) {
                p3[i].classList.add('current');
            }
        }
    }
}



givePiecesEventListeners();