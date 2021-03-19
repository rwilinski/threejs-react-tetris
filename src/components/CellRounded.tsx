import React from "react";
import { RoundedBox } from "@react-three/drei";

import { BOX_SIZE } from "../game/constants";
import { Block, getColorById } from "../game/blocks";

type CellRoundedType = {
  position: [number, number, number];
  color?: string;
  blockId?: Block["id"];
};

export function CellRounded({
  position = [0, 0, 0],
  color,
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
        color={color || getColorById(blockId!)}
        roughness={0.75}
        metalness={0.5}
      />
    </RoundedBox>
  );
}
