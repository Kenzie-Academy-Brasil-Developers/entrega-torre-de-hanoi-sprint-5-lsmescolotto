const tower1 = document.createElement('div')
const tower2 = document.createElement('div')
const tower3 = document.createElement('div')
const start = document.getElementById('start')
start.addEventListener('click', difficulty)

function difficulty() {
    const numberPieces = document.getElementById('difficulty')
    const size = numberPieces.value
    console.log(size)
    createTower(size)
    createSticks(size)
}


function createTower(size) {
    const page = document.querySelector('main')
    
    
    tower1.id = 'tower1'
    tower2.id = 'tower2'
    tower3.id = 'tower3'
    page.appendChild(tower1)
    page.appendChild(tower2)
    page.appendChild(tower3)

    const colors = ['blue', 'green', 'yellow', 'violet', 'red', 'purple', 'black']

    for(let i = 1; i <= size; i++) {
        let disc = document.createElement('div')
        disc.id = `disc${i}`
        disc.style = `width: ${50 + 25*(size-i)}px; height: 30px; background-color: ${colors[i-1]};`
        tower1.appendChild(disc)
    }
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
