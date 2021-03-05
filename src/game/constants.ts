import { Block } from "./blocks";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const BOX_SIZE = 10;

export const GRID_WIDTH = BOX_SIZE * BOARD_WIDTH;
export const GRID_HEIGHT = BOX_SIZE * BOARD_HEIGHT;

export const NORMAL_SPEED = 500;
export const FAST_SPEED = 40;

export const ACTIVE_CELL_SUFFIX = "_active";

// https://strategywiki.org/wiki/Tetris/Rotation_systems
export const ALL_BLOCKS: Block[] = [
  {
    id: "I",
    color: "#ee5253",
    width: 4,
    paths: [
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
      ],
    ],
  },
  {
    id: "O",
    color: "#2ecc71",
    width: 2,
    paths: [
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    ],
  },
  {
    id: "Z",
    color: "#2e86de",
    width: 3,
    paths: [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
      [
        [2, 0],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      [
        [0, 1],
        [1, 1],
        [1, 2],
        [2, 2],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [0, 2],
      ],
    ],
  },
  {
    id: "S",
    color: "#f1c40f",
    width: 3,
    paths: [
      [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [2, 1],
        [2, 2],
      ],
      [
        [1, 1],
        [2, 1],
        [0, 2],
        [1, 2],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ],
  },
  {
    id: "J",
    color: "#9b59b6",
    width: 3,
    paths: [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [2, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [2, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 2],
        [1, 2],
      ],
    ],
  },
  {
    id: "L",
    color: "#0abde3",
    width: 3,
    paths: [
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [2, 0],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [0, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
      ],
    ],
  },
  {
    id: "T",
    color: "#fd79a8",
    width: 3,
    paths: [
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 1],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ],
  },
];
