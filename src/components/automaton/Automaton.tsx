import React from "react";

import "./Automaton.css";

export type AutomatonDescriptionBit = 0 | 1;
export type AutomatonDescription = {
  id: number;
  name: string;
  born: [
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit
  ];
  save: [
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit,
    AutomatonDescriptionBit
  ];
};
export const AutomatonsList: AutomatonDescription[] = [
  {
    id: 1,
    name: "Вольфрама-Паккарда, класс 2 (B018/S018)",
    //     0  1  2  3  4  5  6  7  8
    born: [1, 1, 0, 0, 0, 0, 0, 0, 1],
    save: [1, 1, 0, 0, 0, 0, 0, 0, 1],
  },
  {
    id: 2,
    name: "Вольфрама-Паккарда (B0578/S045)",
    //     0  1  2  3  4  5  6  7  8
    born: [1, 0, 0, 0, 0, 1, 0, 1, 1],
    save: [1, 0, 0, 0, 1, 1, 0, 0, 0],
  },
  {
    id: 3,
    name: "Вольфрама-Паккарда (B0578/S12456)",
    //     0  1  2  3  4  5  6  7  8
    born: [1, 0, 0, 0, 0, 1, 0, 1, 1],
    save: [0, 1, 1, 0, 1, 1, 1, 0, 0],
  },
  {
    id: 4,
    name: "Вольфрама-Паккарда (B1/S012345678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 1, 0, 0, 0, 0, 0, 0, 0],
    save: [1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: 5,
    name: "Gnarl (B1/S1)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 1, 0, 0, 0, 0, 0, 0, 0],
    save: [0, 1, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: 6,
    name: "Gnarl (B123567/S0238)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 1, 1, 1, 0, 1, 1, 1, 0],
    save: [1, 0, 1, 1, 0, 0, 0, 0, 1],
  },
  {
    id: 7,
    name: "Репликатор (B13456/S01356)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 1, 0, 1, 1, 1, 1, 0, 0],
    save: [1, 1, 0, 1, 0, 1, 1, 0, 0],
  },
  {
    id: 8,
    name: "Репликатор (B135/S135)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 1, 0, 1, 0, 1, 0, 0, 0],
    save: [0, 1, 0, 1, 0, 1, 0, 0, 0],
  },
  {
    id: 9,
    name: "Репликатор (B1357/S1357)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 1, 0, 1, 0, 1, 0, 1, 0],
    save: [0, 1, 0, 1, 0, 1, 0, 1, 0],
  },
  {
    id: 10,
    name: "Вольфрама-Паккарда (B137/S45678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 1, 0, 1, 0, 0, 0, 1, 0],
    save: [0, 0, 0, 0, 1, 1, 1, 1, 1],
  },
  {
    id: 11,
    name: "Вольфрама-Паккарда, класс 3 (B236/S0468)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 1, 1, 0, 0, 1, 0, 0],
    save: [1, 0, 0, 0, 1, 0, 1, 0, 1],
  },
  {
    id: 12,
    name: "Вольфрама-Паккарда (B257/S27)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 1, 0, 0, 1, 0, 1, 0],
    save: [0, 0, 1, 0, 0, 0, 0, 1, 0],
  },
  {
    id: 13,
    name: "Бессмертная жизнь (B3/S012345678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    save: [1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: 14,
    name: "Maze (B3/S12345)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    save: [0, 1, 1, 1, 1, 1, 0, 0, 0],
  },
  {
    id: 15,
    name: "Жизнь (B3/S23)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    save: [0, 0, 1, 1, 0, 0, 0, 0, 0],
  },
  {
    id: 16,
    name: "Автомат Вольфрама-Паккарда, класс 2 (B3/S234)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    save: [0, 0, 1, 1, 1, 0, 0, 0, 0],
  },
  {
    id: 17,
    name: "Коралл (B3/S45678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    save: [0, 0, 0, 0, 1, 1, 1, 1, 1],
  },
  {
    id: 18,
    name: "Коралл (B34/S03456)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 1, 0, 0, 0, 0],
    save: [1, 0, 0, 1, 1, 1, 1, 0, 0],
  },
  {
    id: 19,
    name: "Жизнь 34 (B34/S34)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 1, 0, 0, 0, 0],
    save: [0, 0, 0, 1, 1, 0, 0, 0, 0],
  },
  {
    id: 20,
    name: "Ассимиляция (B345/S4567)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 1, 1, 0, 0, 0],
    save: [0, 0, 0, 0, 1, 1, 1, 1, 0],
  },
  {
    id: 21,
    name: "Долгая жизнь (B345/S5)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 1, 1, 0, 0, 0],
    save: [0, 0, 0, 0, 0, 1, 0, 0, 0],
  },
  {
    id: 22,
    name: "Диамёба (B35678/5678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 1, 1, 1, 1],
    save: [0, 0, 0, 0, 0, 1, 1, 1, 1],
  },
  {
    id: 23,
    name: "Амёба (B357/S1358)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 1, 0, 1, 0],
    save: [0, 1, 0, 1, 0, 1, 0, 0, 1],
  },
  {
    id: 24,
    name: "Псевдожизнь (B357/S238)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 1, 0, 1, 0],
    save: [0, 0, 1, 1, 0, 0, 0, 0, 1],
  },
  {
    id: 25,
    name: "2х2 (B36/S125)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 1, 0, 0],
    save: [0, 1, 1, 0, 0, 1, 0, 0, 0],
  },
  {
    id: 26,
    name: "Гламурная жизнь (B36/S23)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 1, 0, 0],
    save: [0, 0, 1, 1, 0, 0, 0, 0, 0],
  },
  {
    id: 27,
    name: "Stains (B367/S2346)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 1, 1, 0],
    save: [0, 0, 1, 1, 1, 0, 1, 0, 0],
  },
  {
    id: 28,
    name: "Stains (B3678/S235678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 1, 1, 1],
    save: [0, 0, 1, 1, 0, 1, 1, 1, 1],
  },
  {
    id: 29,
    name: "День и Ночь (B3678/S34678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 1, 1, 1],
    save: [0, 0, 0, 1, 1, 0, 1, 1, 1],
  },
  {
    id: 30,
    name: "Движение (B368/S245)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 1, 0, 1],
    save: [0, 0, 1, 0, 1, 1, 0, 0, 0],
  },
  {
    id: 31,
    name: "Автомат Вольфрама-Паккарда (B378/S012345678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 0, 1, 1],
    save: [1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: 32,
    name: "Коагуляция (B378/S235678)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 1, 0, 0, 0, 1, 1],
    save: [0, 0, 1, 1, 0, 1, 1, 1, 1],
  },
  {
    id: 33,
    name: "Города за стенами (B45678/S2345)",
    //     0  1  2  3  4  5  6  7  8
    born: [0, 0, 0, 0, 1, 1, 1, 1, 1],
    save: [0, 0, 1, 1, 1, 1, 0, 0, 0],
  },
];
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
