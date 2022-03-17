import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { UserCompany } from "./sn-user-company";

it("Company renders correctly", () => {
  const company = {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  };

  const { asFragment } = render(<UserCompany {...company} />);
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("Company Hide", () => {
  const company = {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  };

  const { asFragment } = render(<UserCompany {...company} />);
  const div = screen.getByTestId("1");
  fireEvent.click(div);

  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
