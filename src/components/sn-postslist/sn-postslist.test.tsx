import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { PostsList } from "./sn-postslist";

it("Posts List renders correctly", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
          },
        ]),
    })
  ) as jest.Mock;

  const { rerender, asFragment } = await waitFor(() =>
    render(<PostsList userId={1} />)
  );
  await waitFor(() => rerender(<PostsList userId={2} />));
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("Posts List Error catched", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.reject("Test Error"),
    })
  ) as jest.Mock;

  const { rerender, asFragment } = await waitFor(() =>
    render(<PostsList userId={1} />)
  );
  await waitFor(() => rerender(<PostsList userId={2} />));
  screen.debug();

  expect(asFragment()).toMatchSnapshot();
});
it("Posts List View Details request", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
        ]),
    })
  ) as jest.Mock;

  const handle = jest.fn();

  const { rerender } = await waitFor(() => render(<PostsList userId={1} />));
  await waitFor(() => rerender(<PostsList userId={2} probe={handle} />));

  const div1 = screen.getByTestId("10") as HTMLDivElement;
  fireEvent.click(div1);
  expect(handle).toBeCalled();

  fireEvent.click(div1);
  expect(handle).toBeCalled();
});
