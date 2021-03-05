import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

import { Grid } from "./components/Grid";
import { Hud } from "./components/Hud";
import { Game } from "./components/Game";
import { GRID_HEIGHT, GRID_WIDTH } from "./game/constants";

function App() {
  const cameraPosition = [GRID_WIDTH / 2, GRID_HEIGHT / 2, 150]; // middle of the grid

  return (
    <Canvas
      shadowMap
      camera={{ fov: 75, position: cameraPosition }}
      style={{ backgroundColor: "#eeeeee" }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <hemisphereLight args={[0xffffff, 0x000000]} position={[0, 20, 20]} />

      {/* @ts-ignore */}
      <OrbitControls target={[GRID_WIDTH / 2, GRID_HEIGHT / 2, 0]} />

      <Grid />

      <Hud />

      <Game />
    </Canvas>
  );
}

export default App;
