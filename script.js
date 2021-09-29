const page = document.querySelector('main')
const numberPieces = document.getElementById('difficulty')
const tower1 = document.createElement('div')
const tower2 = document.createElement('div')
const tower3 = document.createElement('div')
const start = document.getElementById('start')
const exit = document.createElement('button')
const victoryMsg = document.createElement('div')
const current = document.getElementById('current')
const gameDiv = document.createElement('div')
const dif = document.getElementById('dif')
const victoryParagraph = document.createElement('p')
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

    page.appendChild(gameDiv)

    tower1.id = 'tower1'
    tower2.id = 'tower2'
    tower3.id = 'tower3'

    towerStyle(size)

    gameDiv.appendChild(tower1)
    gameDiv.appendChild(tower2)
    gameDiv.appendChild(tower3)


    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet']

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

function selectPiece(evt) {
    if(holding !== 1 && evt.currentTarget.childElementCount > 1) {
        const current = document.getElementById('current')
        const taken = evt.currentTarget.lastChild
        current.appendChild(taken)
        holding = 1
    } else {
        putPiece(evt)
    }
}

function putPiece(evt) {
    if(holding !== 0) {
        const piece = document.getElementById('current').lastChild
        const nextTower = evt.currentTarget
        if(nextTower.childElementCount > 1) {
            const lastNumber = nextTower.lastChild
            if(piece.clientWidth < lastNumber.clientWidth) {
                nextTower.appendChild(piece)
                holding = 0
            }
        } else {
            nextTower.appendChild(piece)
            holding = 0
        }
    moves += 1
    }
    victory(size)
}

 function victory() {
    if (tower2.childElementCount-1 == size || tower3.childElementCount-1 == size){
        removeTowers()
        victoryMsg.classList.add('victoryMsg')
        victoryMsg.id = 'victoryDiv'
        exit.classList.add('exit')
        resetButton.classList.add('resetButton')

        victoryParagraph.innerText = 'Congratulations!!! You won!!!'
        exit.innerText = 'x'
        resetButton.innerText = 'Reset'
        
        victoryMsg.appendChild(exit)
        victoryMsg.appendChild(victoryParagraph)
        page.appendChild(victoryMsg)
        victoryMsg.appendChild(resetButton)
    }
}

function exitVictoryMsg() {
    victoryMsg.style = 'display: none;'
}

function removeInterface() {
    dif.style = 'display: none;'
} 

function towerStyle(size) {
    tower1.style = `width: ${50 + 25*(size)}px; height: ${30 + 30*(size)}px; margin-bottom: 7px solid black;`
    tower2.style = `width: ${50 + 25*(size)}px; height: ${30 + 30*(size)}px; margin-bottom: 7px solid black;`
    tower3.style = `width: ${50 + 25*(size)}px; height: ${30 + 30*(size)}px; margin-bottom: 7px solid black;`
}

function removeTowers() {
    tower1.innerHTML = ''
    tower2.innerHTML = ''
    tower3.innerHTML = ''
    current.style = 'display: none;'
    gameDiv.parentElement.removeChild(gameDiv)
}

function reset() {
    moves = 0
    dif.style = 'display: flex;'
    const victoryDiv = document.getElementById('victoryDiv')
    victoryDiv.parentElement.removeChild(victoryDiv)
}