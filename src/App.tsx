import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-ignore
import { preloadFont } from "troika-three-text";

import { Grid } from "./components/Grid";
import { Hud } from "./components/Hud";
import { Game } from "./components/Game";
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
      <ambientLight />
      <pointLight position={cameraPosition} intensity={1} />

      {/* @ts-ignore */}
      <OrbitControls target={[GRID_WIDTH / 2, GRID_HEIGHT / 2, 0]} />

      {isFontLoaded && (
        <>
          <Grid />

          <Hud />

          <Game />
        </>
      )}
    </Canvas>
  );
}

export default App;
