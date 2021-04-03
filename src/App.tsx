import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
// @ts-ignore
import { preloadFont } from "troika-three-text";

import { Grid } from "./components/Grid";
import { Hud } from "./components/Hud";
import { Game } from "./components/Game";
import { CameraShakeProvider } from "./contexts/CameraShakeContext";
import { RenderBillboardProvider } from "./contexts/RenderBillboard";
import { FONT, GRID_HEIGHT, GRID_WIDTH } from "./game/constants";

function App() {
  const cameraPosition = [GRID_WIDTH / 2, GRID_HEIGHT / 2, 150]; // middle of the grid

  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    preloadFont({ font: FONT }, () => setFontLoaded(true));
  }, []);

  return (
    <Canvas
      shadowMap
      camera={{ fov: 75, position: cameraPosition }}
      onCreated={({ gl }) => gl.setClearColor("#eeeeee")}
    >
      <CameraShakeProvider>
        <RenderBillboardProvider>
          <ambientLight />
          <pointLight position={cameraPosition} intensity={1} />

          {isFontLoaded && (
            <>
              <Grid />

              <Hud />

              <Game />
            </>
          )}
        </RenderBillboardProvider>
      </CameraShakeProvider>
    </Canvas>
  );
}

export default App;
