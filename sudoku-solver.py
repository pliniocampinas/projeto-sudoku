from functools import reduce
import numpy as np
import json
import sys

# print("--- system args ---")
# print(sys.argv)
# print("-------------------")

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
tabuleiro_sudoku_teste = np.zeros((9, 9), dtype=np.int16)

# carrega estrutura com o sudoku inicial
# set_linha_tabuleiro(tabuleiro_sudoku, 1, [6, 0, 4, 0, 0, 7, 0, 0, 0])
# set_linha_tabuleiro(tabuleiro_sudoku, 2, [8, 0, 0, 0, 0, 3, 0, 5, 6])
# set_linha_tabuleiro(tabuleiro_sudoku, 3, [0, 3, 0, 9, 0, 0, 8, 0, 0])
# set_linha_tabuleiro(tabuleiro_sudoku, 4, [0, 0, 0, 5, 0, 0, 0, 9, 0])
# set_linha_tabuleiro(tabuleiro_sudoku, 5, [0, 0, 8, 0, 1, 0, 0, 6, 0])
# set_linha_tabuleiro(tabuleiro_sudoku, 6, [0, 0, 0, 0, 0, 0, 0, 0, 0])
# set_linha_tabuleiro(tabuleiro_sudoku, 7, [0, 0, 0, 0, 0, 0, 7, 0, 2])
# set_linha_tabuleiro(tabuleiro_sudoku, 8, [0, 0, 3, 8, 0, 0, 1, 0, 0])
# set_linha_tabuleiro(tabuleiro_sudoku, 9, [0, 0, 7, 0, 0, 2, 0, 0, 0])

linear_data = []
max_results = 10

# Read argv's
# argv[1] => linear_table_input
# argv[2] => max_results
if(len(sys.argv) > 1):
    linear_data = list(sys.argv[1])
    if(len(sys.argv) > 2):
        max_results = int(sys.argv[2]) if int(sys.argv[2]) < 10 else 10
    n_results = 0
# print(linear_data)


linear_table = []
data_len = len(linear_data)

if data_len < 1:
    print("empty data")
    sys.stdout.flush()
    exit()

i = 0
while i < data_len:
    data_int = 0
    try:
        data_int = int(linear_data[i])
    except:
        data_int = -1
    
    if(data_int >= 0):
        linear_table.append(data_int)
    i = i + 1

for i in range(9):
    set_linha_tabuleiro(tabuleiro_sudoku, i + 1, linear_table[i * 9: (i * 9) + 9])

tabuleiro_resolvido = tabuleiro_sudoku[:]
resolvido = False
resultadoJSON = []

def printTabuleiroJSON(tabuleiro):
    # print(str(tabuleiro))
    print(json.dumps({'results': tabuleiro.tolist()}))

def recordResultJSON(tabuleiro):
    # print(str(tabuleiro))
    global resultadoJSON
    resultadoJSON.append(tabuleiro.tolist())

def printResultsJSON():
    global resultadoJSON
    print(json.dumps({'results': resultadoJSON}))

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

def set_tabuleiro_resolvido(tabuleiro):
    global resolvido
    global tabuleiro_resolvido
    if(resolvido == False):
        resolvido = True
        tabuleiro_resolvido = tabuleiro[:]



def solve():
    global tabuleiro_sudoku 
    global max_results 
    global n_results 
    for y in range(9):
        for x in range(9):
            if tabuleiro_sudoku[y][x] == 0:
                for n in range(1,10):
                    if possible(y,x,n):
                        tabuleiro_sudoku[y][x] = n
                        n_results = solve()
                        if(n_results == max_results):
                            return n_results
                        tabuleiro_sudoku[y][x] = 0
                return n_results
    # printTabuleiroJSON((tabuleiro_sudoku))
    recordResultJSON(tabuleiro_sudoku)
    return n_results + 1
    # input("More?")

solve()
printResultsJSON()
sys.stdout.flush()
