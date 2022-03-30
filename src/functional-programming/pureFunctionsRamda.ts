import { compose, reduce, prop, replace, toPairs, split, map } from "ramda";

// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  //return (teams.reduce((accumulator: Team, team: Team) => (accumulator.score < team.score ? team : accumulator), { name: "", score: 0 })).name;
  return compose<[Team, Team[]], Team, string | number>(
    prop<string, string | number>("name"),
    reduce<Team, Team>((a: Team, t: Team) => (a.score < t.score ? t : a))
  )({ name: "", score: 0 }, teams) as string;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;
type Pair = [string, string | number | boolean | object];

export const createQs = (qsObj: QsObj): string => {
  //return Object.entries(qsObj).reduce((accumulator, item, index, entries) => accumulator += item[0] + "=" + item[1] + (index < entries.length - 1 ? "&" : ""), "?");
  return compose<[QsObj], Pair[], string, string>(
    replace(/&{1}/, "?"),
    reduce<Pair, string>(
      (a: string, t: Pair) => a + "&" + t[0] + "=" + t[1],
      ""
    ),
    toPairs
  )(qsObj);
};

// Задание 3
export const parseQs = (qs: string): QsObj => {
  //return qs.replace("?", "").split("&").reduce((accumulator: QsObj, item) => { accumulator[item.split("=")[0]] = "" + item.split("=")[1]; return accumulator; }, {});
  return compose<[string], string, string[], string[][], QsObj>(
    reduce<string[], QsObj>((a: QsObj, t: string[]) => {
      a[t[0]] = t[1];
      return a;
    }, {}),
    map<string, string[]>((t) => split("=", t)),
    split("&"),
    replace(/\?{1}/, "")
  )(qs);
};
