import React from "react";
import { Sudoku, SUDOKU_SIZE } from "../../utils/sudoku";
import Cell from "./Cell";

interface RowProps {
  rowIndex: number;
  values: Sudoku;
  setSudoku?: (values: Sudoku) => void;
}

const Row = ({ rowIndex, values, setSudoku }: RowProps) => {
  return <div className="flex">{printCells(rowIndex, values, setSudoku)}</div>;
};

const printCells = (
  rowIndex: number,
  values: Sudoku,
  setSudoku?: (values: Sudoku) => void
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
          values={values}
          setSudoku={setSudoku}
        />
      ))}
    </React.Fragment>
  );
};

export default Row;
