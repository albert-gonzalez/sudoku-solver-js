import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Main from "./Main";
import ReactModal from "react-modal";
import {
  createEmptySudoku as mockCreateEmptySudoku,
  solveSudoku as mockSolveSudoku,
} from "../../utils/sudoku";

import { createWorker } from "./createWorker";

jest.mock("./createWorker");

describe("Main Page", () => {
  beforeEach(() => {
    (createWorker as jest.Mock).mockReturnValue({
      onerror: jest.fn(),
      onmessage: jest.fn(),
      onmessageerror: jest.fn(),
      terminate: jest.fn(),
      postMessage: function () {
        const data = mockSolveSudoku(mockCreateEmptySudoku());
        this.onmessage({ data });
      },
      addEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  it("should render the page correctly", () => {
    render(<Main />);

    const mainPage = screen.getByTestId("mainPage");
    expect(mainPage).toBeInTheDocument();

    expect(mainPage).toContainHTML("Write your sudoku");
  });

  it("should try to solve the sudoku and when the form is submitted", async () => {
    render(<Main />);

    const form = screen.getByTestId("sudokuForm");

    fireEvent.submit(form);

    const inputs: HTMLInputElement[] = await screen.findAllByRole("textbox");

    const allInputsHaveAValue = inputs.every((input) => input.value !== "");
    expect(allInputsHaveAValue).toBeTruthy();
  });

  it("should change the background of a cell if has a value when the sudoku is solved", async () => {
    render(<Main />);

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

  it("should clear the sudoku when the clear button is clicked", async () => {
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
  describe("On timeout", () => {
    let mockedWorker = {
      postMessage: jest.fn(),
      terminate: jest.fn(),
    };

    beforeEach(() => {
      mockedWorker = {
        postMessage: jest.fn(),
        terminate: jest.fn(),
      };

      (createWorker as jest.Mock).mockReturnValue(mockedWorker);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it("should terminate the worker and show a modal when the time expires and block the form while is solving", async () => {
      const { baseElement } = render(<Main />);
      ReactModal.setAppElement(baseElement);

      const form = screen.getByTestId("sudokuForm");
      const submitButton = screen.getByTestId("submitButton");
      fireEvent.submit(form);

      const inputs: HTMLInputElement[] = await screen.findAllByRole("textbox");
      const allInputsAreDisabled = inputs.every((input) => input.disabled);

      expect(mockedWorker.terminate).not.toHaveBeenCalled();
      expect(allInputsAreDisabled).toBeTruthy();
      expect(submitButton).toBeDisabled();

      act(() => {
        jest.runOnlyPendingTimers();
      });

      const modal = await screen.findByTestId("solutionNotFoundModal");
      const allInputsAreEnabled = inputs.every((input) => !input.disabled);
      expect(mockedWorker.terminate).toHaveBeenCalled();
      expect(allInputsAreEnabled).toBeTruthy();
      expect(submitButton).toBeEnabled();
      expect(modal).toBeInTheDocument();
    });

    it("should terminate the worker but not show the modal when the time expires but the clear button has been clicked", async () => {
      const { baseElement } = render(<Main />);
      ReactModal.setAppElement(baseElement);

      const form = screen.getByTestId("sudokuForm");
      const submitButton = screen.getByTestId("submitButton");
      const clearButton = screen.getByTestId("clearButton");

      fireEvent.submit(form);
      fireEvent.click(clearButton);

      const inputs: HTMLInputElement[] = await screen.findAllByRole("textbox");
      const allInputsAreEnabled = inputs.every((input) => !input.disabled);

      expect(mockedWorker.terminate).not.toHaveBeenCalled();
      expect(allInputsAreEnabled).toBeTruthy();
      expect(submitButton).toBeEnabled();

      act(() => {
        jest.runOnlyPendingTimers();
      });

      const modal = screen.queryByTestId("solutionNotFoundModal");
      expect(mockedWorker.terminate).toHaveBeenCalled();
      expect(modal).not.toBeInTheDocument();
    });
  });
});
