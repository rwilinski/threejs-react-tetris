import React, { createContext, ReactNode, useContext, useState } from "react";
import { CameraShake } from "@react-three/drei";

type CameraShakeContextType = {
  shake: (duration?: number) => void;
};

type CameraShakeProviderProps = {
  children: ReactNode;
};

export const CameraShakeContext = createContext<CameraShakeContextType>(
  {} as CameraShakeContextType
);

export const CameraShakeProvider = ({ children }: CameraShakeProviderProps) => {
  const [isShake, setShake] = useState(false);

  const value = {
    shake: (duration = 200) => {
      setShake(true);
      setTimeout(() => setShake(false), duration);
    },
  };

  return (
    <CameraShakeContext.Provider value={value}>
      {children}
      {isShake && (
        <CameraShake
          maxYaw={0.02}
          maxPitch={0.02}
          maxRoll={0.02}
          yawFrequency={10}
          pitchFrequency={10}
          rollFrequency={10}
        />
      )}
    </CameraShakeContext.Provider>
  );
};

export const useCameraShake = () => {
  return useContext(CameraShakeContext);
};
