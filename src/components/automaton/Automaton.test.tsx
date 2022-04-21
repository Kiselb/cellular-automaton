import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Automaton } from "./types";
import { DEF_AUTOMATON } from "../../domain/defaults";
import { AutomatonDescription, AutomatonsList } from "./types";

it("Automaton renders correctly", () => {
  const { asFragment } = render(
    <Automaton
      defAutomaton={DEF_AUTOMATON}
      onAutomatonChange={() => console.log("OK")}
    />
  );
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
it("Automaton has style", () => {
  render(
    <Automaton
      defAutomaton={DEF_AUTOMATON}
      onAutomatonChange={() => console.log("OK")}
    />
  );
  const div = screen.getByTestId("automaton");
  expect(div).toHaveClass("automaton");
});
it("Default automaton defined correctly", () => {
  const automaton: AutomatonDescription = AutomatonsList.filter(
    (automaton) => automaton.id === DEF_AUTOMATON
  )[0];
  expect(automaton.id).toEqual(DEF_AUTOMATON);
});
it("Automaton fire event on select", () => {
  const probe = jest.fn();
  render(<Automaton defAutomaton={DEF_AUTOMATON} onAutomatonChange={probe} />);
  const control = screen.getByTestId("automaton");
  fireEvent.change(control);
  expect(probe).toBeCalled();
});
