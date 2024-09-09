class GameBoard {
    /**
     *
     */
    constructor(width, height) {
        this.width = width
        this.height = height

    }
    matrix = []
    rowsGroups = []
    colsGroup = []
    prepare() {
        for (let i = 0; i < this.height; i++) {
            const newLine = []
            for (let j = 0; j < this.width; j++) {
                newLine.push(false)
            }
            this.matrix.push(newLine)
        }
        return this.matrix
    }
    changeMatrix(cell, row) {
        this.matrix[row][cell] = !this.matrix[row][cell]
        this.calculate()
        uiTheCells('edit')
    }
    calculate() {
        this.calculateRows()
        this.calculateCols()
    }

    //#todo refactor the  2 functions to one function
    calculateRows() {
        this.rowsGroups = []
        // מעבר על כל השורות
        for (let index = 0; index < this.matrix.length; index++) {
            // בכל שורה ניצור מערך שיכיל את קבוצות המשבצות השחורות
            let rowArr = []
            let groupCount = 0
            for (let i = 0; i < this.matrix[0].length; i++) {
                if (this.matrix[index][i])
                    groupCount++;
                else {
                    rowArr.push(groupCount)
                    groupCount = 0;
                }
            }
            rowArr.push(groupCount)

            this.rowsGroups.push(rowArr.filter(Boolean))
        }
    }
    calculateCols() {
        this.colsGroup = []

        // מעבר על כל העמודות
        for (let index = 0; index < this.matrix[0].length; index++) {
            // בכל עמודה ניצור מערך שיכיל את קבוצות המשבצות השחורות
            let colArr = []
            let groupCount = 0
            for (let i = 0; i < this.matrix.length; i++) {
                if (this.matrix[i][index])
                    groupCount++;
                else {
                    colArr.push(groupCount)
                    groupCount = 0;
                }
            }
            if (groupCount != 0)
                colArr.push(groupCount)
            this.colsGroup.push(colArr.filter(Boolean))
        }
    }

    addRowToMatrix() {
        
    }

}

const game = new GameBoard(12, 9)
let matrix = game.prepare()

function uiTheCells(type) {

    let container = document.createElement('div')

    container.setAttribute('style', `--columns: ${matrix[0].length}; --rows: ${matrix.length};`)

    container.classList.add('container')

    let emptyCell = document.createElement('div')
    emptyCell.innerText = 'empty'

    let colscells = matrix[0].map((group, index) => {
        let cellHeader = document.createElement('div')

        if (type === 'edit')
            cellHeader.append(...game.colsGroup[index].map(num => {
                let span = document.createElement('span')
                span.innerText = num
                return span
            }))
        else
            cellHeader.innerText = ''
        cellHeader.dataset.colHeader = index
        cellHeader.classList.add('cell-header')
        return cellHeader
    })

    container.append(emptyCell, ...colscells)

    matrix.forEach((row, rindex) => {
        let cellHeader = document.createElement('div')
        cellHeader.innerText = (type === 'edit') ? game.rowsGroups[rindex].join(',') : ''
        cellHeader.dataset.rowHeader = rindex
        cellHeader.classList.add('cell-header')
        container.append(cellHeader)

        let rowcelss = row.map((cell, cindex) => {

            let cellElm = document.createElement('div')
            cellElm.innerText = (rindex) * 10 + (cindex + 1)
            cellElm.dataset.col = cindex
            cellElm.dataset.row = rindex
            if (rindex % 5 == 0) {
                cellElm.classList.add('border-top')
            }
            if (cindex % 5 == 0)
                cellElm.classList.add('border-left')
            if (matrix[rindex][cindex])
                cellElm.classList.add('check')
            cellElm.addEventListener('click', (e) => {
                game.changeMatrix(e.currentTarget.dataset.col, e.currentTarget.dataset.row)
            })
            return cellElm
        })
        container.append(...rowcelss)

    });
    if (type === 'edit') {
        document.querySelector('.container').replaceWith(container)
    }
    else document.body.append(container)
}
uiTheCells('create')

let columnsInput = document.querySelector('[name=columns]')
let columnsVal = document.querySelector('[name=columns]').value

let rowsInput = document.querySelector('[name=rows]')
let rowsVal = document.querySelector('[name=rows]').value
// rowsInput.addEventListener('change', (e))


document.querySelector('#create').addEventListener('click', () => {
    let columnsVal = columnsInput.value
    let rowsVal = rowsInput.value

    var game = new GameBoard(columnsVal, rowsVal)
    console.log(game.width, game.height)
})

 