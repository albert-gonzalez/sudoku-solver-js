import classnames from "classnames";
import React from "react";
import {
  GROUP_SIZE,
  stringToCellValue,
  Sudoku,
  SUDOKU_SIZE,
} from "../../utils/sudoku";

interface CellProps {
  cellIndex: number;
  rowIndex: number;
  sudokuInput: Sudoku;
  setSudokuInput: (sudoku: Sudoku) => void;
  solvedSudoku?: Sudoku;
  clearSolvedSudoku: () => void;
  disabled: boolean;
}

const Cell = ({
  cellIndex,
  rowIndex,
  sudokuInput,
  setSudokuInput,
  solvedSudoku,
  clearSolvedSudoku,
  disabled,
}: CellProps) => {
  const isLastCell = cellIndex === SUDOKU_SIZE - 1;
  const isLastRow = rowIndex === SUDOKU_SIZE - 1;
  const isLastInColumnGroup = cellIndex % GROUP_SIZE === GROUP_SIZE - 1;
  const isLastInRowGroup = rowIndex % GROUP_SIZE === GROUP_SIZE - 1;
  const isInputCell =
    sudokuInput[rowIndex][cellIndex] && solvedSudoku?.[rowIndex][cellIndex];

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = sudokuInput.map((row) => [...row]);
    newValues[rowIndex][cellIndex] = stringToCellValue(e.target.value);

    setSudokuInput(newValues);
    clearSolvedSudoku();
  };

  const selectAllInputText = (e: React.FocusEvent<HTMLInputElement>) =>
    e.target.setSelectionRange(0, e.target.value.length);

  const classes = classnames({
    "border-r": !isLastInColumnGroup && !isLastCell,
    "border-r-4": isLastInColumnGroup && !isLastCell,
    "border-b": !isLastInRowGroup && !isLastRow,
    "border-b-4": isLastInRowGroup && !isLastRow,
    "bg-emerald-700 text-white font-medium": isInputCell,
    "bg-gray-100 text-gray-400": disabled,
  });

  return (
    <input
      type="text"
      maxLength={1}
      max={9}
      min={0}
      className={`text-center ${classes} w-8 h-8 text-2xl sm:w-12 sm:h-12 transition-colors duration-700 ease-in-out`}
      value={
        sudokuInput[rowIndex][cellIndex] ??
        solvedSudoku?.[rowIndex][cellIndex] ??
        ""
      }
      disabled={disabled}
      onChange={changeValue}
      onFocus={selectAllInputText}
      inputMode="numeric"
    />
  );
};

export default Cell;
