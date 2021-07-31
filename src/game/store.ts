import create from "zustand";

import {
  ACTIVE_CELL_SUFFIX,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  GHOST_CELL_SUFFIX,
} from "./constants";
import {
  BlockMetadata,
  BlockPathDimention,
  getRandomBlockAndCenter,
  isCellActive,
  isCellActiveOrGhost,
} from "./blocks";

type Store = {
  board: string[][];
  currentBlock: BlockMetadata | null;
  nextBlock: BlockMetadata | null;
  score: number;
  gameOver: boolean;
  gamePaused: boolean;
  // Actions:
  restart: () => void;
  updateBoard: () => number[];
  moveDown: () => void;
  setCurrentBlock: (block: BlockMetadata) => void;
  prepareForNext: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  toggleGamePause: () => void;
  setGameOver: () => void;
};

export const useStore = create<Store>((set) => ({
  board: [],
  currentBlock: null,
  nextBlock: null,
  score: 0,
  gameOver: true,
  gamePaused: false,
  // Actions:
  restart: () =>
    set((state) => {
      const board: Store["board"] = [];

      for (let i = 0; i < BOARD_HEIGHT; i++) {
        board[i] = [];

        for (let j = 0; j < BOARD_WIDTH; j++) {
          board[i][j] = "";
        }
      }

      return {
        ...state,
        board,
        gameOver: false,
        score: 0,
        currentBlock: getRandomBlockAndCenter(BOARD_WIDTH),
        nextBlock: getRandomBlockAndCenter(BOARD_WIDTH),
      };
    }),
  updateBoard: () => {
    let clearedRows: number[] = [];

    set((state) => {
      // remove old active cells
      const newBoard = state.board.map((row) =>
        row.map((cell) => (isCellActiveOrGhost(cell) ? "" : cell))
      );

      // place a new position of block and add active
      state.currentBlock?.path.forEach((item) => {
        if (!newBoard[item[1]][item[0]]) {
          newBoard[item[1]][item[0]] =
            state.currentBlock!.id + ACTIVE_CELL_SUFFIX;
        }
      });

      state.board.forEach((row, rowIndex) => {
        const isFull =
          row.filter((cell) => cell && !isCellActiveOrGhost(cell)).length ===
          row.length;

        if (isFull) {
          clearedRows = [...clearedRows, rowIndex];

          for (let i = rowIndex; i > 0; i--) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
              if (
                !isCellActiveOrGhost(newBoard[i][j]) &&
                !isCellActiveOrGhost(newBoard[i - 1][j])
              ) {
                newBoard[i][j] = newBoard[i - 1][j];
              }
            }
          }
        }
      });

      let ghostBlock: BlockPathDimention[] = [];

      for (let rowIndex = 1; rowIndex < BOARD_HEIGHT; rowIndex++) {
        const ghostBlockPosition: BlockPathDimention[] =
          state.currentBlock?.path.map((path) => [
            path[0],
            path[1] + rowIndex,
          ]) || [];

        const canPlaceGhostBlock = ghostBlockPosition
          .map((cell) => {
            if (newBoard[cell[1]] && newBoard[cell[1]][cell[0]] !== null) {
              return newBoard[cell[1]][cell[0]];
            }

            return null;
          })
          .every((cell) => cell === "" || isCellActive(cell!));

        if (!canPlaceGhostBlock) {
          break;
        }

        ghostBlock = ghostBlockPosition;
      }

      ghostBlock.forEach((item) => {
        if (!newBoard[item[1]][item[0]]) {
          newBoard[item[1]][item[0]] =
            state.currentBlock!.id + GHOST_CELL_SUFFIX;
        }
      });

      return {
        ...state,
        board: newBoard,
        score: state.score + clearedRows.length * clearedRows.length,
      };
    });

    return clearedRows;
  },
  moveDown: () =>
    set((state) => {
      if (!state.currentBlock) {
        return state;
      }

      return {
        ...state,
        currentBlock: {
          ...state.currentBlock,
          path: state.currentBlock.path.map((item) => [item[0], item[1] + 1]),
        },
      };
    }),
  setCurrentBlock: (block) =>
    set((state) => ({ ...state, currentBlock: block })),
  prepareForNext: () =>
    set((state) => {
      if (!state.currentBlock || !state.nextBlock) {
        return state;
      }

      return {
        ...state,
        // swap blocks
        currentBlock: { ...state.nextBlock },
        // generate next block
        nextBlock: getRandomBlockAndCenter(BOARD_WIDTH),
        // remove active block from board
        board: state.board.map((row) =>
          row.map((cell) => cell.replace(ACTIVE_CELL_SUFFIX, ""))
        ),
      };
    }),
  moveLeft: () =>
    set((state) => {
      if (!state.currentBlock) {
        return state;
      }

      return {
        ...state,
        currentBlock: {
          ...state.currentBlock,
          path: state.currentBlock.path.map((item) => [item[0] - 1, item[1]]),
        },
      };
    }),
  moveRight: () =>
    set((state) => {
      if (!state.currentBlock) {
        return state;
      }

      return {
        ...state,
        currentBlock: {
          ...state.currentBlock,
          path: state.currentBlock.path.map((item) => [item[0] + 1, item[1]]),
        },
      };
    }),
  toggleGamePause: () =>
    set((state) => ({
      ...state,
      gamePaused: !state.gamePaused,
    })),
  setGameOver: () => set((state) => ({ ...state, gameOver: true })),
}));
