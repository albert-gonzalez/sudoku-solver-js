import React, { FormEvent, useState } from "react";
import SolutionModal from "../../components/solutionModal/SolutionModal";
import SudokuComponent from "../../components/sudoku/Sudoku";
import { Sudoku, createEmptySudoku } from "../../utils/sudoku";
import { createWorker } from "./createWorker";

const WORKER_TIMEOUT = 15000;

const Main = () => {
  const [sudoku, setSudoku] = useState(createEmptySudoku());
  const [solvedSudoku, setSolvedSudoku] = useState<Sudoku | undefined>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSolving, setIsSolving] = useState(false);

  const solve = (event: FormEvent) => {
    event.preventDefault();
    setIsSolving(true);
    setIsOpen(true);

    const worker = createWorker();

    const timeoutId = setTimeout(() => {
      worker.terminate();
      setIsSolving(false);
      setSolvedSudoku(undefined);
    }, WORKER_TIMEOUT);

    worker.onmessage = ({ data: solvedSudoku }) => {
      clearTimeout(timeoutId);
      setSolvedSudoku(solvedSudoku);
      setIsSolving(false);
      worker.terminate();
    };

    worker.postMessage(sudoku);
  };

  return (
    <React.Fragment>
      <div
        data-testid="mainPage"
        className="text-center m-auto max-w-3xl min-w-min px-4 mb-4 h-full"
      >
        <p className="text-xl sm:text-2xl mb-12 text-center">
          Write your sudoku and click the "Solve" button or press Enter key to
          solve it instantly!
        </p>
        <form data-testid="sudokuForm" onSubmit={solve}>
          <SudokuComponent sudoku={sudoku} setSudoku={setSudoku} />
          <button
            className="p-4 bg-emerald-900 text-white text-xl font-medium w-64 rounded shadow-md shadow-gray-500 hover:opacity-90"
            type="submit"
          >
            SOLVE!
          </button>
        </form>
      </div>
      <SolutionModal
        setIsOpen={setIsOpen}
        isOpen={modalIsOpen}
        isSolving={isSolving}
        solvedSudoku={solvedSudoku}
      />
    </React.Fragment>
  );
};

export default Main;
