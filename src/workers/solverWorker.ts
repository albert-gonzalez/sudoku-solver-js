/* eslint-disable no-restricted-globals */

import { solveSudoku } from "../utils/sudoku";

self.onmessage = ({ data: sudoku }) => {
  self.postMessage(solveSudoku(sudoku));
};
