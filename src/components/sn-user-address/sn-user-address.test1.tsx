import React from "react";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";

import "@testing-library/jest-dom";
import { UserAddress } from "./sn-user-address";

it("Address renders correctly", () => {
  const address = {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  };

  const { asFragment } = render(<UserAddress {...address} />);
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});

it("Address Hide", () => {
  const address = {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  };

  const { asFragment } = render(<UserAddress {...address} />);
  const div = screen.getByTestId("1");
  fireEvent.click(div);

  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
