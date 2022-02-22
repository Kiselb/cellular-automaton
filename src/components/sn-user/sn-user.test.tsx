import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { User } from "./sn-user";

it("User renders correctly", () => {
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
  const company = {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  };
  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    address: address,
    company: company,
  };

  const { asFragment } = render(<User {...user} />);
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});

it("User renders correctly Address empty", () => {
  const company = {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  };
  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    address: undefined,
    company: company,
  };

  const { asFragment } = render(<User {...user} />);
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("User renders correctly Company empty", () => {
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
  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    address: address,
    company: undefined,
  };

  const { asFragment } = render(<User {...user} />);
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("User renders correctly Optional propeties", () => {
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
  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: undefined,
    website: undefined,
    address: address,
    company: undefined,
  };

  const { asFragment } = render(<User {...user} />);
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
