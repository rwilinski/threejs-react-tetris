import { createContext, ReactNode, useContext, useState } from "react";
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
      <CameraShake
        maxYaw={isShake ? 0.02 : 0}
        maxPitch={isShake ? 0.02 : 0}
        maxRoll={isShake ? 0.02 : 0}
        yawFrequency={isShake ? 10 : 0}
        pitchFrequency={isShake ? 10 : 0}
        rollFrequency={isShake ? 10 : 0}
      />
    </CameraShakeContext.Provider>
  );
};

export const useCameraShake = () => {
  return useContext(CameraShakeContext);
};
