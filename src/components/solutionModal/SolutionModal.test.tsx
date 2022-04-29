import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import ReactModal from "react-modal";
import { createEmptySudoku } from "../../utils/sudoku";
import SolutionModal from "./SolutionModal";

describe("Solution Modal", () => {
  beforeEach(() => {
    ReactModal.setAppElement(document.documentElement);
  });
  it("should show a spinner and a text when solving", () => {
    render(
      <SolutionModal isOpen={true} isSolving={true} setIsOpen={() => {}} />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByTestId("solvingText")).toBeInTheDocument();
  });

  it("should show a a sudoku when it is provided and solving is false", () => {
    render(
      <SolutionModal
        isOpen={true}
        isSolving={false}
        setIsOpen={() => {}}
        solvedSudoku={createEmptySudoku()}
      />
    );

    expect(screen.getByTestId("sudoku")).toBeInTheDocument();
  });

  it("should not show a a sudoku when it is provided but solving is true", () => {
    render(
      <SolutionModal
        isOpen={true}
        isSolving={true}
        setIsOpen={() => {}}
        solvedSudoku={createEmptySudoku()}
      />
    );

    expect(screen.queryByTestId("sudoku")).not.toBeInTheDocument();
  });

  it("should not show a message when is not solving and the sudoku is not provided", () => {
    render(
      <SolutionModal isOpen={true} isSolving={false} setIsOpen={() => {}} />
    );

    expect(screen.queryByTestId("sudoku")).not.toBeInTheDocument();
    expect(screen.getByTestId("notSolvedWarning")).toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", () => {
    render(<TestSolutionModal />);

    const closeModalButton = screen.getByTestId("closeModalButton");

    fireEvent.click(closeModalButton);

    expect(screen.queryByTestId("solutionModal")).not.toBeInTheDocument();
  });
});

const TestSolutionModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <SolutionModal isOpen={isOpen} isSolving={true} setIsOpen={setIsOpen} />
  );
};
