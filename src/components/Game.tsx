import React, { useState } from "react";
import { useEventListener, useInterval } from "ahooks";

import { CellRounded } from "./CellRounded";
import { useStore } from "../game/store";
import { isCellActive, rotateBlock } from "../game/blocks";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOX_SIZE,
  FAST_SPEED,
  NORMAL_SPEED,
} from "../game/constants";

export function Game() {
  const state = useStore();
  const [gameInterval, setGameInterval] = useState<number | null>(null);

  const startNewGame = () => {
    setGameInterval(NORMAL_SPEED);

    state.restart();
    state.updateBoard();
  };

  const canAddNewBlock = () => {
    let canBePlaced = true;

    state.nextBlock!.path.forEach((item) => {
      const cell = state.board[item[1]][item[0]];

      if (cell) {
        canBePlaced = false;
      }
    });

    return canBePlaced;
  };

  const rotate = () => {
    const { path, defaultPath } = state.currentBlock!;
    const offsetLeft = path[0][0] - defaultPath[0][0];
    const offsetTop = path[0][1] - defaultPath[0][1];

    const next = rotateBlock(state.currentBlock!);

    let canRotate = true;

    next.path = next.path.map((item) => [
      item[0] + offsetLeft,
      item[1] + offsetTop,
    ]);

    for (const item of next.path) {
      if (
        item[0] < 0 ||
        item[1] < 0 ||
        item[0] >= BOARD_WIDTH ||
        item[1] >= BOARD_HEIGHT ||
        (state.board[item[1]][item[0]] &&
          !isCellActive(state.board[item[1]][item[0]]))
      ) {
        canRotate = false;
      }
    }

    if (canRotate) {
      state.setCurrentBlock(next);
    }

    state.updateBoard();
  };

  const moveLeft = () => {
    let canMove = true;

    state.currentBlock!.path.forEach((item) => {
      const cell = state.board[item[1]][item[0] - 1];

      if (!(item[0] - 1 >= 0) || (cell && !isCellActive(cell))) {
        canMove = false;
      }
    });

    if (canMove) {
      state.moveLeft();
      state.updateBoard();
    }
  };

  const moveRight = () => {
    let canMove = true;

    state.currentBlock!.path.forEach((item) => {
      const cell = state.board[item[1]][item[0] + 1];

      if (!(item[0] + 1 < BOARD_WIDTH) || (cell && !isCellActive(cell))) {
        canMove = false;
      }
    });

    if (canMove) {
      state.moveRight();
      state.updateBoard();
    }
  };

  const togglePause = () => {
    if (state.gameOver) {
      startNewGame();

      return;
    }

    setGameInterval(state.gamePaused ? NORMAL_SPEED : null);

    state.toggleGamePause();
  };

  useEventListener("keydown", ({ key }: { key: string }) => {
    switch (key) {
      case "ArrowUp":
        if (gameInterval) {
          rotate();
        }

        break;

      case "ArrowLeft":
        if (gameInterval) {
          moveLeft();
        }

        break;

      case "ArrowRight":
        if (gameInterval) {
          moveRight();
        }

        break;

      case "ArrowDown":
        if (gameInterval) {
          setGameInterval(FAST_SPEED);
        }

        break;

      case " ":
        togglePause();
        break;

      default:
        break;
    }
  });

  useEventListener("keyup", ({ key }: { key: string }) => {
    if (key === "ArrowDown" && gameInterval) {
      setGameInterval(NORMAL_SPEED);
    }
  });

  useInterval(
    () => {
      let canMoveDownActiveBlock = false;

      state.board.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          state.currentBlock!.path.forEach((item) => {
            if (
              (cell &&
                !isCellActive(cell) &&
                item[0] === cellIndex &&
                item[1] + 1 === rowIndex) ||
              item[1] + 1 === state.board.length
            ) {
              canMoveDownActiveBlock = true;
            }
          });
        });
      });

      if (canMoveDownActiveBlock) {
        // check can add a new block to the top of the board
        if (!canAddNewBlock()) {
          console.log("Finish!");

          state.setGameOver();

          setGameInterval(null);

          return;
        }

        state.prepareForNext();
      } else {
        state.moveDown();
      }

      state.updateBoard();
    },
    gameInterval,
    { immediate: false }
  );

  return (
    <>
      {state.board.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          if (!cell) {
            return null;
          }

          return (
            <CellRounded
              key={`cell-${rowIndex}-${cellIndex}-${cell}`}
              position={[
                cellIndex * BOX_SIZE,
                // three.js space starts from the bottom, from 0. Need to reverse
                (BOARD_HEIGHT - 1) * BOX_SIZE - rowIndex * BOX_SIZE,
                0,
              ]}
              blockId={cell}
            />
          );
        });
      })}
    </>
  );
}
