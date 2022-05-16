import React, { FormEvent, useState } from "react";
import SolutionNotFoundModal from "../../components/solutionNotfoundModal/SolutionNotFoundModal";
import SudokuComponent from "../../components/sudoku/Sudoku";
import { Sudoku, createEmptySudoku } from "../../utils/sudoku";
import { createWorker } from "./createWorker";
import spinner from "../../assets/spinner.svg";

const WORKER_TIMEOUT = 10000;

const Main = () => {
  const [sudokuInput, setSudokuInput] = useState(createEmptySudoku());
  const [solvedSudoku, setSolvedSudoku] = useState<Sudoku | undefined>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const solve = (event: FormEvent) => {
    event.preventDefault();
    setIsSolving(true);

    const worker = createWorker();

    const notFoundTimeoutId = setTimeout(() => {
      setIsOpen(true);
      setIsSolving(false);
      clearSolvedSudoku();
    }, WORKER_TIMEOUT);

    setTimeout(() => worker.terminate(), WORKER_TIMEOUT);

    setTimeoutId(notFoundTimeoutId);

    worker.onmessage = ({ data: solvedSudoku }) => {
      worker.terminate();
      clearCurrentTimeout(notFoundTimeoutId);
      setSolvedSudoku(solvedSudoku);
      setIsSolving(false);
    };

    worker.postMessage(sudokuInput);
  };

  const clearCurrentTimeout = (privateTimeoutId?: NodeJS.Timeout) => {
    privateTimeoutId && clearTimeout(privateTimeoutId);
    timeoutId && clearTimeout(timeoutId);

    setTimeoutId(undefined);
  };

  const clear = () => {
    clearCurrentTimeout();
    setIsSolving(false);
    setSudokuInput(createEmptySudoku());
    clearSolvedSudoku();
  };

  const clearSolvedSudoku = () => setSolvedSudoku(undefined);

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
          <SudokuComponent
            sudokuInput={sudokuInput}
            setSudokuInput={setSudokuInput}
            solvedSudoku={solvedSudoku}
            clearSolvedSudoku={clearSolvedSudoku}
            disabled={isSolving}
          />
          <button
            data-testid="submitButton"
            className="p-4 mb-4 bg-emerald-900 text-white text-xl text-center font-medium w-64 rounded shadow-md shadow-gray-500 hover:opacity-90"
            type="submit"
            disabled={isSolving}
          >
            {isSolving ? (
              <img
                data-testid="spinner"
                src={spinner}
                className="w-6 animate-spin inline"
                alt="Spinner"
              />
            ) : (
              "Solve!"
            )}
          </button>
          <br></br>
          <button
            data-testid="clearButton"
            className="p-4 bg-emerald-600 text-white text-xl font-medium w-64 rounded shadow-md shadow-gray-500 hover:opacity-90"
            type="button"
            onClick={clear}
          >
            Clear
          </button>
        </form>
      </div>
      <SolutionNotFoundModal setIsOpen={setIsOpen} isOpen={modalIsOpen} />
    </React.Fragment>
  );
};

export default Main;
