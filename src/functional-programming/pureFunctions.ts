// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  return teams.reduce(
    (accumulator: Team, team: Team) =>
      accumulator.score < team.score ? team : accumulator,
    { name: "", score: 0 }
  ).name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
  return Object.entries(qsObj).reduce(
    (accumulator, item, index, entries) =>
      (accumulator +=
        item[0] + "=" + item[1] + (index < entries.length - 1 ? "&" : "")),
    "?"
  );
};

// Задание 3
export const parseQs = (qs: string): QsObj => {
  return qs
    .replace("?", "")
    .split("&")
    .reduce((accumulator: QsObj, item) => {
      accumulator[item.split("=")[0]] = "" + item.split("=")[1];
      return accumulator;
    }, {});
};
