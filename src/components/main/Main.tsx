import React, { useState } from "react";

import { Main as MainNative } from "./MainNative";
import { Main as MainRedux } from "./MainRedux";

export type TMode = "Native" | "Redux";
export type TMainProps = {
  onSelectMode: (event: React.FormEvent<HTMLSelectElement>) => void;
  probe?: ({}) => void;
};

export const Main = ({ ...props }) => {
  const [mode, setMode] = useState<TMode>("Native");
  const onSelectMode = (event: React.FormEvent<HTMLSelectElement>) => {
    setMode(event.currentTarget.value as TMode);
  };

  return (
    <>
      {mode === "Native" ? (
        <MainNative {...props} onSelectMode={onSelectMode} />
      ) : (
        <MainRedux {...props} onSelectMode={onSelectMode} />
      )}
    </>
  );
};
