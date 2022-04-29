import ReactModal from "react-modal";
import Sudoku from "../sudoku/Sudoku";
import { Sudoku as SudokuType } from "../../utils/sudoku";
import React from "react";
import spinner from "../../assets/spinner.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isSolving: boolean;
  solvedSudoku?: SudokuType;
}

const SolutionModal = ({
  isOpen,
  setIsOpen,
  solvedSudoku,
  isSolving,
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setIsOpen(false)}
    >
      <div
        data-testid="solutionModal"
        className="sm:px-4 py-4 min-w-xs max-w-xs sm:max-w-xl"
      >
        <button
          data-testid="closeModalButton"
          className="absolute right-4 top-2"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        {renderContent(isSolving, solvedSudoku)}
      </div>
    </ReactModal>
  );
};

const renderContent = (isSolving: boolean, solvedSudoku?: SudokuType) => {
  if (isSolving) {
    return (
      <div className="flex flex-col justify-center items-center">
        <img
          data-testid="spinner"
          src={spinner}
          className="w-3/4 animate-spin"
          alt="Spinner"
        />
        <p
          data-testid="solvingText"
          className="text-xl sm:text-3xl text-center w-64 md:w-auto"
        >
          Solving, please wait...
        </p>
      </div>
    );
  }

  return solvedSudoku ? (
    <div>
      <h2 className="text-3xl text-center p-3">Sudoku Solved!</h2>
      <Sudoku sudoku={solvedSudoku} />
    </div>
  ) : (
    <p
      data-testid="notSolvedWarning"
      className="text-xl sm:text-3xl text-center w-64 md:w-auto"
    >
      This sudoku does not have any possible solution
    </p>
  );
};

export default SolutionModal;
