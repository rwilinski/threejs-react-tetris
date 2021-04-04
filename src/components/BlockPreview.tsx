import { useMemo } from "react";

import { CellRounded } from "./CellRounded";
import { BlockMetadata, getBlockWidth } from "../game/blocks";
import { BOX_SIZE } from "../game/constants";

type BlockPreviewProps = {
  block: BlockMetadata;
};

export function BlockPreview({ block }: BlockPreviewProps) {
  // X offset to remove
  const xAxisOffset = useMemo(
    () =>
      block.defaultPath.reduce(
        (prev, curr) => (curr[0] < prev ? curr[0] : prev),
        Infinity
      ),
    [block.defaultPath]
  );

  // Y offset to remove
  const yAxisOffset = useMemo(
    () =>
      block.defaultPath.reduce(
        (prev, curr) => (curr[1] < prev ? curr[1] : prev),
        Infinity
      ),
    [block.defaultPath]
  );

  // add X offset to center the block on the plane
  const xCenterOffset = useMemo(() => {
    const blockWidth = getBlockWidth(block.defaultPath);

    return (4 - blockWidth) / 2;
  }, [block.defaultPath]);

  return (
    <>
      <group position={[-60, 125, 0]}>
        {block.defaultPath
          .map((row) => [row[0] - xAxisOffset, row[1] - yAxisOffset])
          .map((row) => (
            <CellRounded
              key={`block-preview-cell-${row[0]}-${row[1]}`}
              position={[
                xCenterOffset * BOX_SIZE + row[0] * BOX_SIZE,
                30 - row[1] * BOX_SIZE,
                0,
              ]}
              blockId={block.id}
            />
          ))}
      </group>
    </>
  );
}
