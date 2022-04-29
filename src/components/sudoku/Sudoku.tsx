import React from "react";
import { Sudoku as SudokuType, SUDOKU_SIZE } from "../../utils/sudoku";
import Row from "./Row";

interface SudokuProps {
  sudoku: SudokuType;
  setSudoku?: (sudoku: SudokuType) => void;
}

const Sudoku = ({ sudoku, setSudoku }: SudokuProps) => {
  return (
    <div>
      <div
        data-testid="sudoku"
        className="bg-white border-4 border-gray-300 rounded-lg w-auto inline-block mb-8"
      >
        {printRows(sudoku, setSudoku)}
      </div>
    </div>
  );
};

const printRows = (
  sudoku: SudokuType,
  setSudoku?: (sudoku: SudokuType) => void
) => {
  const rows = new Array(SUDOKU_SIZE);
  rows.fill(0);

  return (
    <React.Fragment>
      {rows.map((_, index) => (
        <Row
          key={index}
          rowIndex={index}
          setSudoku={setSudoku}
          values={sudoku}
        />
      ))}
    </React.Fragment>
  );
};

export default Sudoku;
