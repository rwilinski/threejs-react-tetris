import { Block } from "./blocks";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const BOX_SIZE = 10;

export const GRID_WIDTH = BOX_SIZE * BOARD_WIDTH;
export const GRID_HEIGHT = BOX_SIZE * BOARD_HEIGHT;

export const NORMAL_SPEED = 500;
export const FAST_SPEED = 40;

export const ACTIVE_CELL_SUFFIX = "_active";
export const GHOST_CELL_SUFFIX = "_ghost";

export const FONT = `${process.env.PUBLIC_URL}/fonts/Raleway/static/Raleway-ExtraBold.ttf`;

export const COLORS = {
  BACKGROUND: "#eee",
  GRID: "#787878",
  TEXT: "#191919",
  GHOST_BLOCK: "e8e8e8",
  BILLBOARD: {
    BACKGROUND: "#4a4e4d",
    TEXT: "#fff",
  },
};

// https://strategywiki.org/wiki/Tetris/Rotation_systems
export const ALL_BLOCKS: Block[] = [
  {
    id: "I",
    color: "#ee5253",
    maxWidth: 4,
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
    maxWidth: 2,
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
    maxWidth: 3,
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
    maxWidth: 3,
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
    maxWidth: 3,
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
    maxWidth: 3,
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
    maxWidth: 3,
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
