import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render the main page correctly", () => {
  render(<App />);

  const headerElement = screen.getByRole("banner");
  expect(headerElement).toBeInTheDocument();

  const mainPage = screen.getByTestId("mainPage");
  expect(mainPage).toBeInTheDocument();
});
