import React from "react";

import { AppStoreMode } from "../../domain/types";
import { Main as MainNative } from "./MainNative";
import { Main as MainRedux } from "./MainRedux";

type MainProps = {
  onModeChange: (mode: AppStoreMode) => void;
  mode: AppStoreMode;
  probe?: ({}) => void;
};

const Main = ({ mode, probe, onModeChange }: MainProps) => {
  const onModeChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    onModeChange(event.currentTarget.value as AppStoreMode);
  };

  return (
    <>
      {mode === "Native" ? (
        <MainNative probe={probe} onModeChange={onModeChangeHandler} />
      ) : mode === "ReduxThunk" ? (
        <MainRedux
          probe={probe}
          onModeChange={onModeChangeHandler}
          useSaga={false}
        />
      ) : (
        <MainRedux probe={probe} onModeChange={onModeChangeHandler} useSaga />
      )}
    </>
  );
};

export default Main;
