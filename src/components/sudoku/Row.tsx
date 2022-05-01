import React from "react";
import { Sudoku, SUDOKU_SIZE } from "../../utils/sudoku";
import Cell from "./Cell";

interface RowProps {
  rowIndex: number;
  sudokuInput: Sudoku;
  setSudokuInput: (values: Sudoku) => void;
  solvedSudoku?: Sudoku;
  clearSolvedSudoku: () => void;
  disabled: boolean;
}

const Row = ({
  rowIndex,
  sudokuInput,
  setSudokuInput,
  solvedSudoku,
  clearSolvedSudoku,
  disabled
}: RowProps) => {
  return (
    <div className="flex">
      {printCells(
        rowIndex,
        sudokuInput,
        clearSolvedSudoku,
        disabled,
        setSudokuInput,
        solvedSudoku
      )}
    </div>
  );
};

const printCells = (
  rowIndex: number,
  sudokuInput: Sudoku,
  clearSolvedSudoku: () => void,
  disabled: boolean,
  setSudokuInput: (values: Sudoku) => void,
  solvedSudoku?: Sudoku
) => {
  const rows = new Array(SUDOKU_SIZE);
  rows.fill(0);

  return (
    <React.Fragment>
      {rows.map((_, index) => (
        <Cell
          key={index}
          rowIndex={rowIndex}
          cellIndex={index}
          sudokuInput={sudokuInput}
          setSudokuInput={setSudokuInput}
          solvedSudoku={solvedSudoku}
          clearSolvedSudoku={clearSolvedSudoku}
          disabled={disabled}
        />
      ))}
    </React.Fragment>
  );
};

export default Row;
