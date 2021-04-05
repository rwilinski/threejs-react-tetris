import { Text } from "@react-three/drei";
import { memo } from "react";

import { COLORS, FONT } from "../game/constants";

export function RenderTextNoMemo({ children, ...props }: any) {
  return (
    <Text
      color={COLORS.TEXT}
      fontSize={18}
      font={FONT}
      textAlign="center"
      {...props}
    >
      {children}
    </Text>
  );
}

export const RenderText = memo(RenderTextNoMemo, (prev, next) => {
  return prev.children === next.children;
});
