import React from "react";

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
  const onModeChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    onModeChange(event.currentTarget.value as AppStoreMode);
    !!probe && probe({});
  };
  if (mode === "Native") {
    return <MainNative probe={probe} onModeChange={onModeChangeHandler} />;
  }
  if (mode === "ReduxThunk") {
    return (
      <MainRedux
        probe={probe}
        onModeChange={onModeChangeHandler}
        useSaga={false}
      />
    );
  }
  if (mode === "ReduxSaga") {
    <MainRedux probe={probe} onModeChange={onModeChangeHandler} useSaga />;
  }
  if (mode === "ReduxEffects") {
    return <MainEffects probe={probe} onModeChange={onModeChangeHandler} />;
  }
  return <MainNative probe={probe} onModeChange={onModeChangeHandler} />;

  // return (
  //   <>
  //     {(() => {
  //       switch (mode) {
  //         case "Native":
  //           return (
  //             <MainNative probe={probe} onModeChange={onModeChangeHandler} />
  //           );
  //         case "ReduxThunk":
  //           return (
  //             <MainRedux
  //               probe={probe}
  //               onModeChange={onModeChangeHandler}
  //               useSaga={false}
  //             />
  //           );
  //         case "ReduxSaga":
  //           return (
  //             <MainRedux
  //               probe={probe}
  //               onModeChange={onModeChangeHandler}
  //               useSaga
  //             />
  //           );
  //         case "ReduxEffects":
  //           return (
  //             <MainEffects probe={probe} onModeChange={onModeChangeHandler} />
  //           );
  //         default:
  //           return (
  //             <MainNative probe={probe} onModeChange={onModeChangeHandler} />
  //           );
  //       }
  //     })()}
  //   </>
  // );
};

export default Main;
