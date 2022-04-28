import React from "react";

import { AppStoreMode } from "../../domain/types";
import { Main as MainNative } from "./MainNative";
import { Main as MainRedux } from "./MainRedux";
import { Main as MainEffects } from "./MainEffects";

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
      {(() => {
        switch (mode) {
          case "Native":
            return (
              <MainNative probe={probe} onModeChange={onModeChangeHandler} />
            );
          case "ReduxThunk":
            return (
              <MainRedux
                probe={probe}
                onModeChange={onModeChangeHandler}
                useSaga={false}
              />
            );
          case "ReduxSaga":
            return (
              <MainRedux
                probe={probe}
                onModeChange={onModeChangeHandler}
                useSaga
              />
            );
          case "ReduxEffects":
            return (
              <MainEffects probe={probe} onModeChange={onModeChangeHandler} />
            );
          default:
            return (
              <MainNative probe={probe} onModeChange={onModeChangeHandler} />
            );
        }
      })()}
    </>
  );
};

export default Main;
