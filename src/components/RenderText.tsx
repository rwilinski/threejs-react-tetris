import React from "react";
import { Text } from "@react-three/drei";

export function RenderText({ children, ...props }: any) {
  return (
    <Text
      color="#111"
      fontSize={18}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      {...props}
    >
      {children}
    </Text>
  );
}
