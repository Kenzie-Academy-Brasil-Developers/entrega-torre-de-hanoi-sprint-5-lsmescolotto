const start = document.getElementById('start')
start.addEventListener('click', difficulty)

function difficulty() {
    const numberPieces = document.getElementById('difficulty')
    const size = numberPieces.value
    console.log(size)
    createTower(size)
}

function createTower(size) {
    const page = document.querySelector('main')
    const tower1 = document.createElement('div')
    const tower2 = document.createElement('div')
    const tower3 = document.createElement('div')
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
