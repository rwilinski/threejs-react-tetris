import React from "react";
import shallow from "zustand/shallow";

import { BlockPreview } from "./BlockPreview";
import { useStore } from "../game/store";
import { GRID_WIDTH, GRID_HEIGHT } from "../game/constants";
import { RenderText } from "./RenderText";

export function Hud() {
  const { score, nextBlock } = useStore(
    (state) => ({ score: state.score, nextBlock: state.nextBlock }),
    shallow
  );

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
        {score}
      </RenderText>

      {nextBlock && <BlockPreview block={nextBlock} />}
    </>
  );
}
