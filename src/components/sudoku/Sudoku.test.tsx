import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  createEmptySudoku,
  solveSudoku,
  Sudoku as SudokuType,
} from "../../utils/sudoku";
import Sudoku from "./Sudoku";

describe("Sudoku Component", () => {
  it("should render a Sudoku with inputs when is editable and change the state with correct numbers if the some value changes", async () => {
    let sudoku: SudokuType = [[]];
    let setSudoku;

    const TestSudoku = () => {
      [sudoku, setSudoku] = useState(createEmptySudoku());
      return (
        <Sudoku
          sudokuInput={sudoku}
          setSudokuInput={setSudoku}
          clearSolvedSudoku={() => {}}
          disabled={false}
        />
      );
    };

    render(<TestSudoku />);

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs.length).toEqual(81);

    fireEvent.change(inputs[4], { target: { value: "5" } });
    fireEvent.change(inputs[5], { target: { value: "55" } });
    fireEvent.change(inputs[6], { target: { value: "-3" } });
    fireEvent.change(inputs[7], { target: { value: "invalid" } });

    expect(sudoku[0][4]).toEqual(5);
    expect(sudoku[0][5]).toEqual(9);
    expect(sudoku[0][6]).toEqual(1);
    expect(sudoku[0][7]).toEqual(null);
  });

  it("should change the background of a cell if has a value when the sudoku is solved", async () => {
    let sudoku: SudokuType = [[]];
    let setSudoku;

    const TestSudoku = () => {
      sudoku = createEmptySudoku();
      sudoku[0][0] = 1;

      [sudoku, setSudoku] = useState(sudoku);
      return (
        <Sudoku
          sudokuInput={sudoku}
          setSudokuInput={setSudoku}
          clearSolvedSudoku={() => {}}
          disabled={false}
          solvedSudoku={solveSudoku(sudoku)!}
        />
      );
    };

    render(<TestSudoku />);

    const inputs: HTMLInputElement[] = screen.getAllByRole("textbox");
    const filledInput = inputs[0];
    const solvedInput = inputs[1];

    expect(filledInput.classList.toString()).toContain("bg");
    expect(solvedInput.classList.toString()).not.toContain("bg");
  });

  it("should disable all the inputs if the sudoku is disabled", async () => {
    render(
      <Sudoku
        sudokuInput={createEmptySudoku()}
        setSudokuInput={() => {}}
        clearSolvedSudoku={() => {}}
        disabled={true}
      />
    );

    const inputs: HTMLInputElement[] = screen.getAllByRole("textbox");

    const everyInputIsDisabled = inputs.every((input) => input.disabled);

    expect(everyInputIsDisabled).toBeTruthy();
  });
});
