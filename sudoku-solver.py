from functools import reduce
import numpy as np

def set_linha_tabuleiro(tabuleiro, linha, valores):
    tabuleiro[linha - 1][0] = valores[0]
    tabuleiro[linha - 1][1] = valores[1]
    tabuleiro[linha - 1][2] = valores[2]
    tabuleiro[linha - 1][3] = valores[3]
    tabuleiro[linha - 1][4] = valores[4]
    tabuleiro[linha - 1][5] = valores[5]
    tabuleiro[linha - 1][6] = valores[6]
    tabuleiro[linha - 1][7] = valores[7]
    tabuleiro[linha - 1][8] = valores[8]

# definindo o tabuleiro
tabuleiro_sudoku = np.zeros((9, 9), dtype=np.int16)

# carrega estrutura com o sudoku inicial
set_linha_tabuleiro(tabuleiro_sudoku, 1, [6, 0, 4, 0, 0, 7, 0, 0, 0])
set_linha_tabuleiro(tabuleiro_sudoku, 2, [8, 0, 0, 0, 0, 3, 0, 5, 6])
set_linha_tabuleiro(tabuleiro_sudoku, 3, [0, 3, 0, 9, 0, 0, 8, 0, 0])
set_linha_tabuleiro(tabuleiro_sudoku, 4, [0, 0, 0, 5, 0, 0, 0, 9, 0])
set_linha_tabuleiro(tabuleiro_sudoku, 5, [0, 0, 8, 0, 1, 0, 0, 6, 0])
set_linha_tabuleiro(tabuleiro_sudoku, 6, [0, 0, 0, 0, 0, 0, 0, 0, 0])
set_linha_tabuleiro(tabuleiro_sudoku, 7, [0, 0, 0, 0, 0, 0, 7, 0, 2])
set_linha_tabuleiro(tabuleiro_sudoku, 8, [0, 0, 3, 8, 0, 0, 1, 0, 0])
set_linha_tabuleiro(tabuleiro_sudoku, 9, [0, 0, 7, 0, 0, 2, 0, 0, 0])

def possible(y,x,n):
    global tabuleiro_sudoku
    for i in range(0,9):
        if tabuleiro_sudoku[y][i] == n:
            return False
    for i in range(0,9):
        if tabuleiro_sudoku[i][x] == n:
            return False
    x0 = (x//3)*3
    y0 = (y//3)*3
    for i in range(0,3):
        for j in range(0,3):
            if tabuleiro_sudoku[y0+i][x0+j] == n:
                return False
    return True

def solve():
    global tabuleiro_sudoku
    for y in range(9):
        for x in range(9):
            if tabuleiro_sudoku[y][x] == 0:
                for n in range(1,10):
                    if possible(y,x,n):
                        tabuleiro_sudoku[y][x] = n
                        solve()
                        tabuleiro_sudoku[y][x] = 0
                return
    print(tabuleiro_sudoku)
    input("More?")

solve()

