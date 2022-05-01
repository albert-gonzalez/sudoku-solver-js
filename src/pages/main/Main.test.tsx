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

  it("should try to solve the sudoku and when the form is submitted", async () => {
    const { baseElement } = render(<Main />);
    ReactModal.setAppElement(baseElement);

    const form = screen.getByTestId("sudokuForm");

    fireEvent.submit(form);

    const inputs: HTMLInputElement[] = await screen.findAllByRole("textbox");

    const allInputsHaveAValue = inputs.every((input) => input.value);
    expect(allInputsHaveAValue).toBeTruthy();
  });

  it("should change the background of a cell if has a value when the sudoku is solved", async () => {
    const { baseElement } = render(<Main />);
    ReactModal.setAppElement(baseElement);

    const form = screen.getByTestId("sudokuForm");
    const inputs: HTMLInputElement[] = screen.getAllByRole("textbox");
    const inputToFill = inputs[0];
    const inputToSolve = inputs[1];
    fireEvent.change(inputToFill, { target: { value: "5" } });

    fireEvent.submit(form);

    expect(inputToFill.classList.toString()).toContain("bg");
    expect(inputToSolve.classList.toString()).not.toContain("bg");
  });

  it("should clear the solved sudoku but no the input value if a input is changed", async () => {
    const { baseElement } = render(<Main />);
    ReactModal.setAppElement(baseElement);

    const form = screen.getByTestId("sudokuForm");
    const inputs: HTMLInputElement[] = screen.getAllByRole("textbox");
    const inputToChange = inputs[0];
    const inputToSolve = inputs[1];

    fireEvent.submit(form);

    expect(inputToSolve.value).not.toBe("");

    fireEvent.change(inputToChange, { target: { value: "5" } });

    expect(inputToSolve.value).toBe("");
    expect(inputToChange.value).toBe("5");
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

    expect(
      screen.queryByTestId("solutionNotFoundModal")
    ).not.toBeInTheDocument();
  });
});
