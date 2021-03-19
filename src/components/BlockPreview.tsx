import React from "react";

import { CellRounded } from "./CellRounded";
import { BlockMetadata, getBlockWidth } from "../game/blocks";
import { BOX_SIZE } from "../game/constants";

type BlockPreviewProps = {
  block: BlockMetadata;
};

export function BlockPreview({ block }: BlockPreviewProps) {
  // remove X/Y offsets of block, no needed here
  const xAxisOffset = block.defaultPath.reduce(
    (prev, curr) => (curr[0] < prev ? curr[0] : prev),
    Infinity
  );
  const yAxisOffset = block.defaultPath.reduce(
    (prev, curr) => (curr[1] < prev ? curr[1] : prev),
    Infinity
  );

  // add X offset to center on the plane
  const blockWidth = getBlockWidth(block.defaultPath);
  const xCenterOffset = (4 - blockWidth) / 2;

  return (
    <>
      <group position={[-60, 125, 0]}>
        {block.defaultPath
          .map((row) => [row[0] - xAxisOffset, row[1] - yAxisOffset])
          .map((row) => {
            return (
              <CellRounded
                key={`block-preview-cell-${row[0]}-${row[1]}`}
                position={[
                  xCenterOffset * BOX_SIZE + row[0] * BOX_SIZE,
                  30 - row[1] * BOX_SIZE,
                  0,
                ]}
                color={block.color}
              />
            );
          })}

        {/*
        {Array.from(Array(5).keys()).map((index) => (
          <Line
            key={`horizontal-line-${index}`}
            points={[
              [0, index * BOX_SIZE, 0],
              [4 * BOX_SIZE, index * BOX_SIZE, 0],
            ]}
            color="#787878"
            lineWidth={0.5}
          />
        ))}

        {Array.from(Array(5).keys()).map((index) => (
          <Line
            key={`vertical-line-${index}`}
            points={[
              [index * BOX_SIZE, 0, 0],
              [index * BOX_SIZE, 4 * BOX_SIZE, 0],
            ]}
            color="#787878"
            lineWidth={0.5}
          />
        ))}
        */}
      </group>
    </>
  );
}
