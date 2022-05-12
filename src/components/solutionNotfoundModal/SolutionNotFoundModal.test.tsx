import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import ReactModal from "react-modal";
import SolutionNotFoundModal from "./SolutionNotFoundModal";

describe("Solution Not Found Modal", () => {
  beforeEach(() => {
    ReactModal.setAppElement(document.documentElement);
  });

  it("should not show a message when is not solving and the sudoku is not provided", () => {
    render(<SolutionNotFoundModal isOpen={true} setIsOpen={() => {}} />);

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
  return <SolutionNotFoundModal isOpen={isOpen} setIsOpen={setIsOpen} />;
};
