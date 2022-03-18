import React from "react";

import { AutomatonsList, AutomatonDescription } from "./Automaton.types";
import "./Automaton.css";

export type AutomatonProps = {
  defAutomaton: number;
  onAutomatonChange: (params: AutomatonDescription) => void;
};
export const Automaton: React.FC<AutomatonProps> = ({
  defAutomaton,
  onAutomatonChange,
}: AutomatonProps) => {
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
      }).map((automaton, index) => (
        <option key={automaton.id} value={automaton.id}>
          {automaton.name}
        </option>
      ))}
    </select>
  );
};
