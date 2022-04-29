import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReactModal from "react-modal";
import { createEmptySudoku, Sudoku as SudokuType } from "../../utils/sudoku";
import Sudoku from "./Sudoku";

describe("Sudoku Component", () => {
  describe("Editable", () => {
    it("should render a Sudoku with inputs when is editable and change the state with correct numbers if the some value changes", async () => {
      let sudoku: SudokuType = [[]];
      let setSudoku;

      const TestSudoku = () => {
        [sudoku, setSudoku] = useState(createEmptySudoku());
        return <Sudoku sudoku={sudoku} setSudoku={setSudoku} />;
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
  });

  describe("Not editable", () => {
    const sudoku = createEmptySudoku();
    sudoku[0][5] = 3;

    render(<Sudoku sudoku={sudoku} />);

    const spans = screen.getAllByTestId("sudokuCell") as HTMLInputElement[];

    expect(spans.length).toEqual(81);
    expect(spans[5].textContent).toEqual("3");
  });
});
