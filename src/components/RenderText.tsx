import React from "react";
import { Text } from "@react-three/drei";

export function RenderText({ children, ...props }: any) {
  return (
    <Text
      color="#111"
      fontSize={18}
      font="/fonts/Raleway/static/Raleway-Thin.ttf"
      textAlign="center"
      {...props}
    >
      {children}
    </Text>
  );
}
