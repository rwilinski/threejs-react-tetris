import { Text } from "@react-three/drei";

import { COLORS, FONT } from "../game/constants";

export function RenderText({ children, ...props }: any) {
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
