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

  it("should should clear the sudoku when the clear button is clicked", async () => {
    render(<Main />);

    const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;
    const secondInput = screen.getAllByRole("textbox")[34] as HTMLInputElement;

    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "4" } });

    expect(input.value).toBe("5");
    expect(secondInput.value).toBe("4");

    const clearButton = screen.getByTestId("clearButton");

    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(secondInput.value).toBe("");

    expect(screen.queryByTestId("solutionModal")).not.toBeInTheDocument();
  });
});
