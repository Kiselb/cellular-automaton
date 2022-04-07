import React, { createElement } from "react";
import { render as DOMRender, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

import { Main } from "./MainRedux";
import { DEF_ROWS, DEF_COLS, DEF_FILL, DEF_VELOCITY } from "../Defaults";
import { AuthProvider } from "../Auth";
import store from "../ducks/store";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

it("App renders correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <AuthProvider>
        <Main onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Main should change X size", () => {
  const probe = jest.fn((size) => {
    expect(size).toEqual(DEF_COLS + 1);
  });
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const input = utils.getByTestId("sizex");
  fireEvent.change(input, { target: { value: DEF_COLS + 1 } });
  expect(probe).toBeCalled();
});
it("MainRedux should change Y size", () => {
  const probe = jest.fn((size) => {
    expect(size).toEqual(DEF_ROWS + 1);
  });
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const input = utils.getByTestId("sizey");
  fireEvent.change(input, { target: { value: DEF_ROWS + 1 } });
  expect(probe).toBeCalled();
});
it("MainRedux should change Fill factor", () => {
  const probe = jest.fn((factor) => {
    expect(factor).toEqual(DEF_FILL + 1);
  });
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const input = utils.getByTestId("fillfactor");
  fireEvent.change(input, { target: { value: DEF_FILL + 1 } });
  expect(probe).toBeCalled();
});
it("MainRedux should Run automaton", () => {
  const probe = jest.fn();
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const button = utils.getByTestId("actionrun");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
it("MainRedux should Stop automaton", () => {
  const probe = jest.fn();
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const button = utils.getByTestId("actionstop");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
it("MainRedux should Clear field", () => {
  const probe = jest.fn();
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const button = utils.getByTestId("actionclear");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
it("MainRedux should Fill field", () => {
  const probe = jest.fn();
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const button = utils.getByTestId("actionfill");
  fireEvent.click(button);
  expect(probe).toBeCalled();
});
// it("MainRedux should fire Tick", () => {
//     const probe = jest.fn();
//     jest.useFakeTimers();
//     const utils = render(
//         <AuthProvider>
//             <Main probe={probe} />
//         </AuthProvider>
//     );
//     const button = utils.getByTestId("actionrun");
//     fireEvent.click(button);
//     expect(probe).toBeCalled();
//     jest.advanceTimersByTime(DEF_VELOCITY * 10);
//     expect(probe).toBeCalledTimes(10 + 1);
// });
it("MainRedux should fire Tick", () => {
  const probe = jest.fn();
  jest.useFakeTimers();

  let container: HTMLDivElement | null = document.createElement("div");
  document.body.appendChild(container);

  act(() => {
    DOMRender(
      <Provider store={store}>
        <AuthProvider>
          <Main probe={probe} onSelectMode={() => console.log("OK")} />
        </AuthProvider>
      </Provider>,
      container
    );
  });
  const button = container.querySelector("[data-testid=actionrun]");
  act(() => {
    !!button &&
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(probe).toBeCalled();
  act(() => {
    jest.advanceTimersByTime(DEF_VELOCITY * 10);
  });
  expect(probe).toBeCalledTimes(10 + 1);

  !!container && unmountComponentAtNode(container);
  !!container && container.remove();
  container = null;
});
it("MainRedux should Set Automaton", () => {
  const probe = jest.fn((automaton) => {
    expect(automaton.id).toEqual(1);
  });
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const select = utils.getByTestId("automaton");
  fireEvent.change(select, { target: { value: 1 } });
  expect(probe).toBeCalled();
});
it("MainRedux should Set Velocity", () => {
  const probe = jest.fn((velocity) => {
    expect(velocity).toEqual(2000);
  });
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const select = utils.getByTestId("velocity");
  fireEvent.change(select, { target: { value: 2000 } });
  expect(probe).toBeCalled();
});
it("MainRedux should click Cell", () => {
  const probe = jest.fn((cell) => {
    expect(cell.row).toEqual(0);
    expect(cell.col).toEqual(0);
  });
  const utils = render(
    <Provider store={store}>
      <AuthProvider>
        <Main probe={probe} onSelectMode={() => console.log("OK")} />
      </AuthProvider>
    </Provider>
  );
  const cell = utils.getByTestId("R0:C0");
  fireEvent.click(cell);
  expect(probe).toBeCalled();
});
