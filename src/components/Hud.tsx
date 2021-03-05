import React from "react";

import { useStore } from "../game/store";
import { GRID_WIDTH, GRID_HEIGHT } from "../game/constants";
import { RenderText } from "./RenderText";
import { BlockPreview } from "./BlockPreview";

export function Hud() {
  const state = useStore();

  return (
    <>
      <RenderText
        position={[-20, GRID_HEIGHT, 0]}
        anchorX="right"
        anchorY="top"
      >
        NEXT
      </RenderText>

      <RenderText
        position={[GRID_WIDTH + 20, GRID_HEIGHT, 0]}
        anchorX="left"
        anchorY="top"
      >
        SCORE
      </RenderText>

      <RenderText
        position={[GRID_WIDTH + 50, GRID_HEIGHT - 30, 0]}
        anchorY="top"
      >
        {state.score}
      </RenderText>

      {state.nextBlock && <BlockPreview block={state.nextBlock} />}
    </>
  );
}
