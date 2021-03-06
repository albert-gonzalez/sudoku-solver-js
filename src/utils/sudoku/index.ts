export const SUDOKU_SIZE = 9;
export const GROUP_SIZE = 3;
export type CellValue = number | null;
export type Sudoku = CellValue[][];

export const createEmptySudoku = (): Sudoku => {
  const sudoku = new Array(SUDOKU_SIZE).fill(null);

  return sudoku.map(() => new Array(SUDOKU_SIZE).fill(null));
};

export const stringToCellValue = (value: string): CellValue => {
  if (!value.length) {
    return null;
  }

  const intValue = +value;

  if (isNaN(intValue)) {
    return null;
  }

  return Math.min(9, Math.max(1, intValue));
};

export const solveSudoku = (sudoku: Sudoku): Sudoku | null => {
  if (
    sudoku.length < SUDOKU_SIZE ||
    sudoku.some((row) => row.length < SUDOKU_SIZE) ||
    sudoku
      .flat()
      .some((cell) => cell != null && (isNaN(cell) || cell > 9 || cell < 1))
  ) {
    return null;
  }

  return solveValidSudoku(sudoku);
};

const solveValidSudoku = (sudoku: Sudoku, x = 0, y = 0): Sudoku | null => {
  const cellValue = sudoku[x][y];
  const newSudoku = sudoku.map((row) => [...row]);
  const nextX = (x + 1) % SUDOKU_SIZE;
  const nextY = nextX === 0 ? y + 1 : y;

  if (!cellValue) {
    for (let i = 1; i <= SUDOKU_SIZE; i++) {
      newSudoku[x][y] = i;
      if (isPositionValid(newSudoku, x, y)) {
        if (isLastPosition(x, y)) {
          return newSudoku;
        }

        const solvedSudoku = solveValidSudoku(newSudoku, nextX, nextY);

        if (solvedSudoku) {
          return solvedSudoku;
        }
      }
    }
  } else {
    if (!isPositionValid(sudoku, x, y)) {
      return null;
    }

    if (isLastPosition(x, y)) {
      return sudoku;
    }

    return solveValidSudoku(sudoku, nextX, nextY);
  }

  return null;
};

const isPositionValid = (sudoku: Sudoku, x: number, y: number): boolean => {
  const cellValue = sudoku[x][y];

  for (let i = 0; i < sudoku.length; i++) {
    if (i !== y && sudoku[x][i] === cellValue) {
      return false;
    }
  }

  for (let i = 0; i < sudoku.length; i++) {
    if (i !== x && sudoku[i][y] === cellValue) {
      return false;
    }
  }

  const rowGroup = Math.floor(x / GROUP_SIZE);
  const colGroup = Math.floor(y / GROUP_SIZE);

  for (
    let i = rowGroup * GROUP_SIZE, stepX = 0;
    stepX < GROUP_SIZE;
    i++, stepX++
  ) {
    for (
      let j = colGroup * GROUP_SIZE, stepY = 0;
      stepY < GROUP_SIZE;
      j++, stepY++
    ) {
      if (i !== x && j !== y && sudoku[i][j] === cellValue) {
        return false;
      }
    }
  }

  return true;
};

const isLastPosition = (x: number, y: number): boolean =>
  x === SUDOKU_SIZE - 1 && y === SUDOKU_SIZE - 1;
