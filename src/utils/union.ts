// Source: https://gist.github.com/profencer/3bb943558e224ece263b2389d6536157
//
import { FC, ComponentType, createElement } from "react";

const createUnion = <O>(o: { [K in keyof O]: ComponentType<O[K]> }) => {
  const R: FC<{ [K in keyof O]: { type: K } & O[K] }[keyof O]> = (props) =>
    createElement(o[props.type], props);
  R.displayName = `Factory(${Object.keys(o).sort().join(", ")})`;
  return R;
};

export default createUnion;
