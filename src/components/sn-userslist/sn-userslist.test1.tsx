import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { UsersList } from "./sn-userslist";

it("Users List renders correctly", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
          {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
            email: "Shanna@melissa.tv",
            address: {
              street: "Victor Plains",
              suite: "Suite 879",
              city: "Wisokyburgh",
              zipcode: "90566-7771",
              geo: {
                lat: "-43.9509",
                lng: "-34.4618",
              },
            },
            phone: "010-692-6593 x09125",
            website: "anastasia.net",
            company: {
              name: "Deckow-Crist",
              catchPhrase: "Proactive didactic contingency",
              bs: "synergize scalable supply-chains",
            },
          },
          {
            id: 3,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
          {
            id: 4,
            name: "Xeanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        ]),
    })
  ) as jest.Mock;

  const { asFragment } = await waitFor(() =>
    render(<UsersList userSelected={() => console.log("OK")} />)
  );
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("Users List Error catched", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.reject("Test Error"),
    })
  ) as jest.Mock;

  const { asFragment } = await waitFor(() =>
    render(<UsersList userSelected={() => console.log("OK")} />)
  );
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("Users List Select User", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        ]),
    })
  ) as jest.Mock;

  const handle = jest.fn();
  await waitFor(() => render(<UsersList userSelected={handle} />));

  const div = screen.getByTestId("50") as HTMLDivElement;
  fireEvent.click(div);
  expect(handle).toBeCalled();
});
it("Users List View Details request", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        ]),
    })
  ) as jest.Mock;

  const handle1 = jest.fn();
  const handle2 = jest.fn();

  await waitFor(() =>
    render(<UsersList userSelected={handle1} probe={handle2} />)
  );

  const div1 = screen.getByTestId("40") as HTMLDivElement;
  fireEvent.click(div1);
  expect(handle2).toBeCalled();

  const div2 = screen.getByTestId("50") as HTMLDivElement;
  fireEvent.click(div2);
  expect(handle1).toBeCalled();

  fireEvent.click(div1);
  expect(handle2).toBeCalled();
});
