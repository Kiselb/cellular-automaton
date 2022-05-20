import React, { useCallback } from "react";

import { AppStoreMode } from "../../domain/types";
import { Main as MainNative } from "./components/native/MainNative";
import { Main as MainRedux } from "./components/redux/MainRedux";
import { Main as MainEffects } from "./components/effects/MainEffects";

type MainProps = {
  onModeChange: (mode: AppStoreMode) => void;
  mode: AppStoreMode;
  probe?: ({}) => void;
};

const Main = ({ mode, probe, onModeChange }: MainProps) => {
  const onModeChangeHandler = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      onModeChange(event.currentTarget.value as AppStoreMode);
      !!probe && probe({});
    },
    [probe]
  );

  const native = (
    <MainNative probe={probe} onModeChange={onModeChangeHandler} />
  );
  const reduxThunk = (
    <MainRedux
      probe={probe}
      onModeChange={onModeChangeHandler}
      useSaga={false}
    />
  );
  const reduxSaga = (
    <MainRedux
      probe={probe}
      onModeChange={onModeChangeHandler}
      useSaga={true}
    />
  );
  const effects = (
    <MainEffects probe={probe} onModeChange={onModeChangeHandler} />
  );
  const union: { [key in AppStoreMode]: JSX.Element } = {
    Native: native,
    ReduxThunk: reduxThunk,
    ReduxSaga: reduxSaga,
    ReduxEffects: effects,
  };

  return <>{union[mode]}</>;
};

export default Main;
