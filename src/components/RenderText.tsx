import React from "react";
import { Text } from "@react-three/drei";

import { FONT } from "../game/constants";

export function RenderText({ children, ...props }: any) {
  return (
    <Text color="#111" fontSize={18} font={FONT} textAlign="center" {...props}>
      {children}
    </Text>
  );
}
