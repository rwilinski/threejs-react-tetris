import React from "react";

import { CellRounded } from "./CellRounded";
import { BlockMetadata } from "../game/blocks";
import { BOX_SIZE } from "../game/constants";

type BlockPreviewProps = {
  block: BlockMetadata;
};

export function BlockPreview({ block }: BlockPreviewProps) {
  return (
    <group position={[-60, 160, 0]}>
      {[...block.defaultPath].reverse().map((row, rowIndex) => {
        return (
          <CellRounded
            key={`${row[0]}-${row[1]}`}
            position={[row[0] * BOX_SIZE, -row[1] * BOX_SIZE, 0]}
            color={block.color}
          />
        );
      })}
    </group>
  );
}
