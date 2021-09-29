const tower1 = document.createElement('div')
const tower2 = document.createElement('div')
const tower3 = document.createElement('div')
const start = document.getElementById('start')
start.addEventListener('click', difficulty)

let holding = 0
let moves = 0

function difficulty() {
    const numberPieces = document.getElementById('difficulty')
    const size = numberPieces.value
    console.log(size)
    createSticks(size)
    createTower(size)
}


function createTower(size) {
    const page = document.querySelector('main')
    const current = document.getElementById('current')
    const gameDiv = document.createElement('div')
    current.style = 'display: flex;'
    gameDiv.id = 'towers'
    page.appendChild(gameDiv)

    tower1.id = 'tower1'
    tower2.id = 'tower2'
    tower3.id = 'tower3'
    gameDiv.appendChild(tower1)
    gameDiv.appendChild(tower2)
    gameDiv.appendChild(tower3)

    const colors = ['blue', 'green', 'yellow', 'violet', 'red', 'purple', 'gray']

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


function createSticks(size) {
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

function victory() {
    if (tower2.childElementCount === 8 || tower3.childElementCount === 8){
        console.log("that's a win!!!")
    }
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
}

function removeInterface() {
    const dif = document.getElementById('dif')
    dif.style = 'display: none;'
} 
