from functools import reduce
import numpy as np
import json
import sys


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


def recordResultJSON(tabuleiro, empty = False):
    # print(str(tabuleiro))
    global resultadoJSON
    if empty == False:
        resultadoJSON.append(tabuleiro.tolist())
    else:
        resultadoJSON.append(['a'])


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
    recordResultJSON(tabuleiro_sudoku)
    return n_results + 1


# control variables
linear_data = []
n_results = 0
max_results = 0
_STD_N_RESULTS = 1
_MAX_PERMITED = 10
permited_n = lambda n: (n < _MAX_PERMITED ) and (n > 0)

# Read argv's
# argv[1] => linear_table_input
# argv[2] => n_results_requested
if(len(sys.argv) > 1):
    linear_data = list(sys.argv[1])
    if(len(sys.argv) > 2):
        n_results_requested = int(sys.argv[2])
        if(n_results_requested == 0):
            max_results = _STD_N_RESULTS
        elif not permited_n(n_results_requested):
            max_results = _MAX_PERMITED
        else:
            max_results = n_results_requested
    else:
        max_results = _STD_N_RESULTS

linear_table = []
data_len = len(linear_data)


if data_len < 1:
    recordResultJSON(None, empty = True)
    printResultsJSON()
    # flushes results to node
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

# defining table
tabuleiro_sudoku = np.zeros((9, 9), dtype=np.int16)
for i in range(9):
    set_linha_tabuleiro(tabuleiro_sudoku, i + 1, linear_table[i * 9: (i * 9) + 9])

resultadoJSON = []
# solve table and print results in JSON format
solve()
printResultsJSON()
# flushes results to node
sys.stdout.flush()
