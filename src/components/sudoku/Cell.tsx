import classnames from "classnames";
import React from "react";
import { CellValue, GROUP_SIZE, Sudoku, SUDOKU_SIZE } from "../../utils/sudoku";

interface CellProps {
  cellIndex: number;
  rowIndex: number;
  values: Sudoku;
  setSudoku?: (values: Sudoku) => void;
}

const Cell = ({ cellIndex, rowIndex, values, setSudoku }: CellProps) => {
  const isLastCell = cellIndex === SUDOKU_SIZE - 1;
  const isLastRow = rowIndex === SUDOKU_SIZE - 1;
  const isLastInColumnGroup = cellIndex % GROUP_SIZE === GROUP_SIZE - 1;
  const isLastInRowGroup = rowIndex % GROUP_SIZE === GROUP_SIZE - 1;

  const stringToCellValue = (value: string): CellValue => {
    if (!value.length) {
      return null;
    }

    const intValue = +value;

    if (isNaN(intValue)) {
      return null;
    }

    return Math.min(9, Math.max(0, intValue));
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setSudoku) {
      return;
    }
    const newValues = values.map((row) => [...row]);
    newValues[rowIndex][cellIndex] = stringToCellValue(e.target.value);

    setSudoku(newValues);
  };

  const classes = classnames({
    "border-r": !isLastInColumnGroup && !isLastCell,
    "border-r-4": isLastInColumnGroup && !isLastCell,
    "border-b": !isLastInRowGroup && !isLastRow,
    "border-b-4": isLastInRowGroup && !isLastRow,
  });

  return setSudoku ? (
    <input
      type="text"
      maxLength={1}
      max={9}
      min={0}
      className={`text-black text-center ${classes} w-8 h-8 text-2xl sm:w-12 sm:h-12`}
      value={values[rowIndex][cellIndex] ?? ""}
      disabled={!setSudoku}
      onChange={changeValue}
    />
  ) : (
    <span
      className={`text-black text-center align-middle ${classes} w-7 h-7 sm:w-12 sm:h-12 flex items-center justify-center text-xl`}
    >
      {values[rowIndex][cellIndex] ?? ""}
    </span>
  );
};

export default Cell;
