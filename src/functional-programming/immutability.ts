// Задание 1
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam = (
  originalTeam: OriginalTeam
): ExpectedTeam => ({
  roster: 25,
  league: originalTeam.league,
  name: originalTeam.name === "Tampa Bay Roosters" ? "New York Badgers" : "",
});

// Задание 2
export type SomeArray = Array<number | string>;

const words: string[] = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
export const originalArrayToExpectedArray = (
  originalArray: SomeArray
): SomeArray => {
  return originalArray.map((item: number | string, index: number) =>
    index === 0
      ? typeof item === "string"
        ? words.indexOf(item) === 9
          ? words[0]
          : words[words.indexOf(item) + 1]
        : item === 9
        ? words[0]
        : words[item + 1]
      : typeof item === "string"
      ? words.indexOf(item) === 9
        ? words[0]
        : words[words.indexOf(item) + 1]
      : item === 9
      ? 0
      : item + 1
  );
};

// Задание 3
export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};
type TeamCommon = {
  [key: string]: string | number | TeamCommon;
};
export const originalTeamToExpectedTeam2 = (originalTeam: Team): Team => {
  const deepTransform = (source: TeamCommon, destination: TeamCommon) => {
    return Object.entries(source).reduce((accumulator, item) => {
      if (typeof item[1] === "string") {
        destination[item[0]] = item[1];
      } else if (typeof item[1] === "number") {
        destination[item[0]] = item[0] === "age" ? item[1] + 1 : item[1];
      } else {
        destination[item[0]] = {};
        deepTransform(item[1], destination[item[0]] as TeamCommon);
      }
      return accumulator;
    }, destination);
  };
  return deepTransform(originalTeam, {}) as Team;
};
