const page = document.querySelector('main')
const numberPieces = document.getElementById('difficulty')
const tower1 = document.createElement('div')
const tower2 = document.createElement('div')
const tower3 = document.createElement('div')
const start = document.getElementById('start')
const exit = document.createElement('button')
const victoryMsg = document.createElement('div')
const current = document.getElementById('current')
const currentText = document.createElement('div')
const piece = document.createElement('div')
const counting = document.createElement('h3')
const gameDiv = document.createElement('div')
const dif = document.getElementById('dif')
const victoryParagraph = document.createElement('p')
const minMoves = document.createElement('h4')
const movesToVictory = document.createElement('h4')
const resetButton = document.createElement('button')

start.addEventListener('click', difficulty)
exit.addEventListener('click', exitVictoryMsg)
resetButton.addEventListener('click', reset)

let size = numberPieces.value
let holding = 0
let moves = 0

function difficulty() {
    size = numberPieces.value
    createTower(size)
}

function createTower() {
    createSticks(size)

    current.style = 'display: flex;'
    gameDiv.id = 'towers'

    creatCounter()

    page.appendChild(gameDiv)

    tower1.id = 'tower1'
    tower2.id = 'tower2'
    tower3.id = 'tower3'

    towerStyle(size)

    gameDiv.appendChild(tower1)
    gameDiv.appendChild(tower2)
    gameDiv.appendChild(tower3)


    const colors = ['violet', 'purple', 'blue', 'green', 'yellow', 'orange', 'red']

    for(let i = 1; i <= size; i++) {
        let disc = document.createElement('div')
        disc.innerText = (size - i) + 1
        disc.id = `disc${i}`
        disc.classList = 'disc'
        disc.style = `width: ${50 + 25*(size-i)}px; height: 30px; background-color: ${colors[i-1]};`
        tower1.appendChild(disc)
    }
    addEventToTower()
    removeInterface()
}


function createSticks() {
    const stick1 = document.createElement('div');
    const stick2 = document.createElement('div');
    const stick3 = document.createElement('div');

    stick1.className = "stick1"
    stick2.className = "stick2"
    stick3.className = "stick3"

    stick1.style = `height: ${30 + size*30}px;`
    stick2.style = `height: ${30 + size*30}px;`
    stick3.style = `height: ${30 + size*30}px;`

    tower1.appendChild(stick1);
    tower2.appendChild(stick2);
    tower3.appendChild(stick3);
}

function addEventToTower() {
    tower1.addEventListener('click', selectPiece)
    tower2.addEventListener('click', selectPiece)
    tower3.addEventListener('click', selectPiece)
}

function creatCounter() {
    counting.innerText = `Moves: ${moves}`
    currentText.innerText = 'Current Piece: '
    piece.id = 'currentPiece'
    currentText.id = 'showPiece'
    current.appendChild(counting)
    current.appendChild(piece)
    piece.appendChild(currentText)
}

function countPlays(){
    counting.innerText = `Moves: ${moves}`
}

function selectPiece(evt) {
    if(holding !== 1 && evt.currentTarget.childElementCount > 1) {
        const take = evt.currentTarget.lastChild
        piece.appendChild(take)
        holding = 1
    } else {
        putPiece(evt)
    }
}

function putPiece(evt) {
    if(holding !== 0) {
        const takenPiece = piece.lastChild
        const nextTower = evt.currentTarget
        if(nextTower.childElementCount > 1) {
            const lastNumber = nextTower.lastChild
            if(takenPiece.clientWidth < lastNumber.clientWidth) {
                nextTower.appendChild(takenPiece)
                holding = 0
                moves++
                countPlays()
            }
        } else {
            nextTower.appendChild(takenPiece)
            holding = 0
            moves++
            countPlays()
        }
    }
    victory(size)
}

function msg() {
    victoryParagraph.innerText = 'Congratulations!!! You won!!!'
    minMoves.innerText = `Minimum Moves: ${(2 ** size) - 1}`
    movesToVictory.innerText = `Your Moves: ${moves}`
    victoryMsg.appendChild(victoryParagraph)
    victoryMsg.appendChild(minMoves)
    victoryMsg.appendChild(movesToVictory)
}

 function victory() {
    if (tower2.childElementCount-1 == size || tower3.childElementCount-1 == size){
        victoryMsg.classList.add('victoryMsg')
        victoryMsg.id = 'victoryDiv'
        exit.classList.add('exit')
        resetButton.classList.add('resetButton')

        exit.innerText = 'x'
        resetButton.innerText = 'Reset'
        
        victoryMsg.appendChild(exit)

        msg()

        page.appendChild(victoryMsg)
        victoryMsg.appendChild(resetButton)
    }
}

function exitVictoryMsg() {
    victoryMsg.style = 'display: none;'
    tower1.removeEventListener('click', selectPiece, false)
    tower2.removeEventListener('click', selectPiece, false)
    tower3.removeEventListener('click', selectPiece, false)
}

function removeInterface() {
    dif.style = 'display: none;'
}

function towerStyle(size) {
    tower1.style = `width: ${50 + 25*(size)}px; height: ${30 + 30*(size)}px; margin-bottom: 7px solid black;`
    tower2.style = `width: ${50 + 25*(size)}px; height: ${30 + 30*(size)}px; margin-bottom: 7px solid black;`
    tower3.style = `width: ${50 + 25*(size)}px; height: ${30 + 30*(size)}px; margin-bottom: 7px solid black;`
}

function reset() {
    tower1.innerHTML = ''
    tower2.innerHTML = ''
    tower3.innerHTML = ''
    current.style = 'display: none;'
    gameDiv.parentElement.removeChild(gameDiv)
    moves = 0
    dif.style = 'display: flex;'
    const victoryDiv = document.getElementById('victoryDiv')
    victoryDiv.parentElement.removeChild(victoryDiv)
}
