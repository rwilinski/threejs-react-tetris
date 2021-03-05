import React, { useEffect, useState } from "react";
import { useEventListener, useInterval } from "ahooks";

import { useStore } from "../game/store";
import { isCellActive, rotateBlock } from "../game/blocks";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOX_SIZE,
  FAST_SPEED,
  NORMAL_SPEED,
} from "../game/constants";
import { CellRounded } from "./CellRounded";

export function Game() {
  const state = useStore();
  const [gameInterval, setGameInterval] = useState<number | null>(null);

  useEventListener("keydown", ({ key }: { key: string }) => {
    switch (key) {
      case "ArrowUp":
        if (!state.currentBlock || state.gameOver || state.gamePaused) {
          return;
        }

        const { path, defaultPath } = state.currentBlock;
        const offsetLeft = path[0][0] - defaultPath[0][0];
        const offsetTop = path[0][1] - defaultPath[0][1];

        const next = rotateBlock(state.currentBlock);

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
        break;

      case "ArrowLeft":
        if (!state.currentBlock || state.gameOver || state.gamePaused) {
          return;
        }

        let canBeShifted2 = true;

        state.currentBlock.path.forEach((item) => {
          const cell = state.board[item[1]][item[0] - 1];

          if (!(item[0] - 1 >= 0) || (cell && !isCellActive(cell))) {
            canBeShifted2 = false;
          }
        });

        if (canBeShifted2) {
          state.moveLeft();
          state.updateBoard();
        }
        break;

      case "ArrowRight":
        if (!state.currentBlock || state.gameOver || state.gamePaused) {
          return;
        }

        let canBeShifted3 = true;

        state.currentBlock.path.forEach((item) => {
          const cell = state.board[item[1]][item[0] + 1];

          if (!(item[0] + 1 < BOARD_WIDTH) || (cell && !isCellActive(cell))) {
            canBeShifted3 = false;
          }
        });

        if (canBeShifted3) {
          state.moveRight();
          state.updateBoard();
        }
        break;

      case "ArrowDown":
        if (!state.currentBlock || state.gameOver || state.gamePaused) {
          return;
        }

        setGameInterval(FAST_SPEED);

        break;

      case " ":
        if (state.gameOver) {
          startNewGame();

          return;
        }

        if (state.gamePaused) {
          setGameInterval(NORMAL_SPEED);
        } else {
          setGameInterval(null);
        }

        state.toggleGamePause();
        break;

      default:
        break;
    }
  });

  useEventListener("keyup", ({ key }: { key: string }) => {
    switch (key) {
      case "ArrowDown":
        if (!state.currentBlock || state.gameOver || state.gamePaused) {
          return;
        }

        setGameInterval(NORMAL_SPEED);

        break;
      default:
        break;
    }
  });

  const canAddNewBlock = () => {
    let canBePlaced = true;

    state.nextBlock.path.forEach((item) => {
      const cell = state.board[item[1]][item[0]];

      if (cell) {
        canBePlaced = false;
      }
    });

    return canBePlaced;
  };

  useInterval(
    () => {
      let canMoveDownActiveBlock = false;

      state.board.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          state.currentBlock.path.forEach((item) => {
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

  const startNewGame = () => {
    setGameInterval(NORMAL_SPEED);

    state.restart();
    state.updateBoard();
  };

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {[...state.board].reverse().map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          if (!cell) {
            return null;
          }

          return (
            <CellRounded
              key={`${rowIndex}-${cellIndex}`}
              position={[cellIndex * BOX_SIZE, rowIndex * BOX_SIZE, 0]}
              blockId={cell}
            />
          );
        });
      })}
    </>
  );
}
