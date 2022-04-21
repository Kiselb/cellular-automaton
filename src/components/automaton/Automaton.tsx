import React from "react";

import { AutomatonsList, Props } from "./types";
import "./Automaton.css";

export const Automaton: React.FC<Props> = ({
  defAutomaton,
  onAutomatonChange,
}: Props) => {
  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    onAutomatonChange(
      AutomatonsList.filter(
        (automaton) => automaton.id === parseInt(event.currentTarget.value)
      )[0]
    );
  };
  return (
    <select
      className="automaton"
      data-testid="automaton"
      onChange={onChange}
      defaultValue={defAutomaton}
    >
      {AutomatonsList.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }).map((automaton) => (
        <option key={automaton.id} value={automaton.id}>
          {automaton.name}
        </option>
      ))}
    </select>
  );
};
