import ReactModal from "react-modal";
import { Sudoku as SudokuType } from "../../utils/sudoku";
import React from "react";

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
}

const SolutionNotFoundModal = ({
  isOpen,
  setIsOpen,
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
        data-testid="solutionNotFoundModal"
        className="sm:px-4 py-4 min-w-xs max-w-xs sm:max-w-xl"
      >
        <button
          data-testid="closeModalButton"
          className="absolute right-4 top-2"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        {renderContent()}
      </div>
    </ReactModal>
  );
};

const renderContent = () => {
  return (
    <p
      data-testid="notSolvedWarning"
      className="text-xl sm:text-3xl text-center w-64 md:w-auto"
    >
      This sudoku does not have any possible solution
    </p>
  );
};

export default SolutionNotFoundModal;
