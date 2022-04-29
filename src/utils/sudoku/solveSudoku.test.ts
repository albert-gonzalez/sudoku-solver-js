import { solveSudoku } from ".";
import each from "jest-each";
import { invalidSudoku, solvedSudoku } from "./solveSudokuDataProvider";

describe("Solve Sudoku", () => {
  each(solvedSudoku).test(
    "it should solve the provided sudoku",
    (sudoku, expected) => {
      expect(solveSudoku(sudoku)).toStrictEqual(expected);
    }
  );

  it("should return null if the provided sudoku can not be resolved", () => {
    expect(
      solveSudoku([
        [2, 2, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
      ])
    ).toBeNull();
  });

  each(invalidSudoku).test(
    "should return null if the provided sudoku is invalid because $reason",
    (reason, invalidSudoku) => {
      expect(solveSudoku(invalidSudoku)).toBeNull();
    }
  );
});
