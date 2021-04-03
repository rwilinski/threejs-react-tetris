import { createContext, ReactNode, useContext, useState } from "react";
import { Billboard, Text } from "@react-three/drei";
import { GRID_WIDTH, FONT } from "../game/constants";

type RenderBillboardContextType = {
  show: (text: string) => void;
  hide: () => void;
};

type RenderBillboardProviderProps = {
  children: ReactNode;
};

export const RenderBillboardContext = createContext<RenderBillboardContextType>(
  {} as RenderBillboardContextType
);

export const RenderBillboardProvider = ({
  children,
}: RenderBillboardProviderProps) => {
  const [text, setText] = useState<string | null>(null);

  const value = {
    show: (txt: string) => setText(txt),
    hide: () => setText(null),
  };

  return (
    <RenderBillboardContext.Provider value={value}>
      {children}
      {text && (
        // @ts-ignore
        <Billboard
          position={[GRID_WIDTH / 2, 100, 50]}
          args={[100, 50]}
          material-color="#4a4e4d"
          follow={true}
        >
          {/* @ts-ignore */}
          <Text
            position={[0, 0, 1]}
            color="#fff"
            fontSize={7}
            maxWidth={90}
            font={FONT}
            anchorX="center"
            anchorY="middle"
            textAlign="center"
          >
            {text}
          </Text>
        </Billboard>
      )}
    </RenderBillboardContext.Provider>
  );
};

export const useRenderBillboard = () => {
  return useContext(RenderBillboardContext);
};
