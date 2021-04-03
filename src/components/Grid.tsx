import { Line } from "@react-three/drei";

import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT,
  BOX_SIZE,
} from "../game/constants";

const lineProps = {
  color: "#787878",
  lineWidth: 0.5,
};

export function Grid() {
  return (
    <>
      {Array.from(Array(BOARD_HEIGHT + 1).keys()).map((index) => (
        // @ts-ignore
        <Line
          key={`grid-horizontal-line-${index}`}
          points={[
            [0, index * BOX_SIZE, 0],
            [GRID_WIDTH, index * BOX_SIZE, 0],
          ]}
          {...lineProps}
        />
      ))}

      {Array.from(Array(BOARD_WIDTH + 1).keys()).map((index) => (
        // @ts-ignore
        <Line
          key={`grid-vertical-line-${index}`}
          points={[
            [index * BOX_SIZE, 0, 0],
            [index * BOX_SIZE, GRID_HEIGHT, 0],
          ]}
          {...lineProps}
        />
      ))}
    </>
  );
}
