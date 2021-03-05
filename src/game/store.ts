import create from "zustand";

import { ACTIVE_CELL_SUFFIX, BOARD_HEIGHT, BOARD_WIDTH } from "./constants";
import { BlockMetadata, getRandomBlockAndCenter, isCellActive } from "./blocks";

type Store = {
  board: string[][];
  currentBlock: BlockMetadata;
  nextBlock: BlockMetadata;
  score: number;
  gameOver: boolean;
  gamePaused: boolean;
  // Actions:
  restart: () => void;
  updateBoard: () => void;
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
  currentBlock: getRandomBlockAndCenter(BOARD_WIDTH),
  nextBlock: getRandomBlockAndCenter(BOARD_WIDTH),
  score: 0,
  gameOver: false,
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
  updateBoard: () =>
    set((state) => {
      // remove old active cells
      const newBoard = state.board.map((row) =>
        row.map((cell) => (isCellActive(cell) ? "" : cell))
      );

      // place a new position of block and add active
      state.currentBlock.path.forEach((item) => {
        if (!newBoard[item[1]][item[0]]) {
          newBoard[item[1]][item[0]] =
            state.currentBlock.id + ACTIVE_CELL_SUFFIX;
        }
      });

      const fullRows: number[] = [];

      state.board.forEach((row, rowIndex) => {
        const isFull =
          row.filter((cell) => cell && !isCellActive(cell)).length ===
          row.length;

        if (isFull) {
          fullRows.push(rowIndex);
        }
      });

      if (fullRows.length) {
        // remove full rows from the bottom
        fullRows.forEach((row) => {
          for (let i = row; i > 0; i--) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
              if (
                !isCellActive(newBoard[i][j]) &&
                !isCellActive(newBoard[i - 1][j])
              ) {
                newBoard[i][j] = newBoard[i - 1][j];
              }
            }
          }
        });
      }

      return {
        ...state,
        board: newBoard,
        score: state.score + fullRows.length * fullRows.length,
      };
    }),
  moveDown: () =>
    set((state) => {
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
      return {
        ...state,
        // swap blocks
        currentBlock: { ...state.nextBlock },
        // generateNextBlock
        nextBlock: getRandomBlockAndCenter(BOARD_WIDTH),
        // remove active block from board
        board: state.board.map((row) =>
          row.map((cell) => cell.replace(ACTIVE_CELL_SUFFIX, ""))
        ),
      };
    }),
  moveLeft: () =>
    set((state) => {
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
