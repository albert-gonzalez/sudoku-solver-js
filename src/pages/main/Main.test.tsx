import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Main from "./Main";
import ReactModal from "react-modal";

describe("Main Page", () => {
  it("should render the page correctly", () => {
    render(<Main />);

    const mainPage = screen.getByTestId("mainPage");
    expect(mainPage).toBeInTheDocument();

    expect(mainPage).toContainHTML("Write your sudoku");
  });

  it("should try to solve the sudoku and a modal with the result when the form is submitted", async () => {
    const { baseElement } = render(<Main />);
    ReactModal.setAppElement(baseElement);

    const form = screen.getByTestId("sudokuForm");

    fireEvent.submit(form);

    const modal = await screen.findByTestId("solutionModal");

    expect(modal).toBeInTheDocument();
    expect(modal).toContainHTML("any possible solution");
  });

  it("should should close the modal when the close button is clicked", async () => {
    const { baseElement } = render(<Main />);
    ReactModal.setAppElement(baseElement);

    const form = screen.getByTestId("sudokuForm");

    fireEvent.submit(form);

    const closeModalButton = screen.getByTestId("closeModalButton");

    fireEvent.click(closeModalButton);

    expect(screen.queryByTestId("solutionModal")).not.toBeInTheDocument();
  });
});
