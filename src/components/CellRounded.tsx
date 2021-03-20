import React from "react";
import { RoundedBox } from "@react-three/drei";

import { BOX_SIZE } from "../game/constants";
import { Block, getColorById } from "../game/blocks";

type CellRoundedType = {
  position: [number, number, number];
  blockId: Block["id"];
};

function CellRoundedNoMemo({
  position = [0, 0, 0],
  blockId,
  ...props
}: CellRoundedType) {
  return (
    // @ts-ignore
    <RoundedBox
      args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]}
      radius={0.8}
      smoothness={1}
      position={position.map((p) => p + BOX_SIZE / 2)}
      {...props}
    >
      <meshStandardMaterial
        color={getColorById(blockId)}
        roughness={0.75}
        metalness={0.5}
      />
    </RoundedBox>
  );
}

export const CellRounded = React.memo(CellRoundedNoMemo, (prev, next) => {
  return (
    prev.position[0] === next.position[0] &&
    prev.position[1] === next.position[1] &&
    prev.position[2] === next.position[2] &&
    prev.blockId === next.blockId
  );
});
