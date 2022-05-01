import React from "react";
import { Sudoku as SudokuType, SUDOKU_SIZE } from "../../utils/sudoku";
import Row from "./Row";

interface SudokuProps {
  sudokuInput: SudokuType;
  setSudokuInput: (sudoku: SudokuType) => void;
  solvedSudoku?: SudokuType;
  clearSolvedSudoku: () => void;
  disabled: boolean;
}

const Sudoku = ({
  sudokuInput,
  setSudokuInput,
  solvedSudoku,
  clearSolvedSudoku,
  disabled
}: SudokuProps) => {
  return (
    <div>
      <div
        data-testid="sudoku"
        className="bg-white border-4 border-gray-300 rounded-lg w-auto inline-block mb-8"
      >
        {printRows(
          sudokuInput,
          clearSolvedSudoku,
          disabled,
          setSudokuInput,
          solvedSudoku
        )}
      </div>
    </div>
  );
};

const printRows = (
  sudokuInput: SudokuType,
  clearSolvedSudoku: () => void,
  disabled: boolean,
  setSudokuInput: (sudoku: SudokuType) => void,
  solvedSudoku?: SudokuType
) => {
  const rows = new Array(SUDOKU_SIZE);
  rows.fill(0);

  return (
    <React.Fragment>
      {rows.map((_, index) => (
        <Row
          key={index}
          rowIndex={index}
          setSudokuInput={setSudokuInput}
          sudokuInput={sudokuInput}
          solvedSudoku={solvedSudoku}
          clearSolvedSudoku={clearSolvedSudoku}
          disabled={disabled}
        />
      ))}
    </React.Fragment>
  );
};

export default Sudoku;
