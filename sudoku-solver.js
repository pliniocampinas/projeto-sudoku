class Solver {

    constructor() {
        this.max_results = 0
        this.n_results = 0
        this.solverResults  = []
        this.sudoku_board = null
        this.initBoard()
    }

    initBoard() {
        this.sudoku_board = []
        for(var i=0; i<9; i++) {
            this.sudoku_board[i] = [];
            for(var j=0; j<9; j++) {
                this.sudoku_board[i][j] = 0
            }
        }
    }

    setBoard(linearTable) {
        linearTable.forEach((cell, index) => {
            let x = index % 9
            let y = (Math.floor(index/9))
            this.sudoku_board[y][x] = cell * 1
        })
    }

    getResults() {
        return this.solverResults
    }

    setMaxResults(maxResults) {
        this.max_results = maxResults
    }

    isAPossibleMove(yPosition, xPosition, moveNumber) {
        // global sudoku_board
        for(let i=0; i < 9; i++) {
            if (this.sudoku_board[yPosition][i] == moveNumber) {
                return false
            }
        }

        for(let i=0; i < 9; i++) {
            if (this.sudoku_board[i][xPosition] == moveNumber) {
                return false
            }
        }
            
        let x0 = Math.floor(xPosition/3) * 3
        let y0 = Math.floor(yPosition/3) * 3

        for(var i=0; i<3; i++) {
            for(var j=0; j<3; j++) {
                if(this.sudoku_board[y0+i][x0+j] == moveNumber) {
                    return false
                }
            }
        }

        return true
    }

    solve() {
        for(var x=0; x<9; x++) {
            for(var y=0; y<9; y++) {

                if(this.sudoku_board[y][x] == 0) {

                    for(var n=1; n<10; n++) {
                        if(this.isAPossibleMove(y,x,n)) {
                            this.sudoku_board[y][x] = n
                            this.n_results = this.solve()
                            if(this.n_results == this.max_results) {
                                return this.n_results
                            }
                            this.sudoku_board[y][x] = 0
                        }
                    }
                    return this.n_results
                }

            }
        }

        this.solverResults.push(this.deepCopy(this.sudoku_board))
        return this.n_results + 1
    }

    deepCopy(matrix) {
        return matrix.map(line => line.map(cell => cell))
    }
}

module.exports.Solver = Solver
