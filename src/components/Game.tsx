import { useEffect, useState } from "react";
import { useEventListener, useInterval } from "ahooks";

import { CellRounded } from "./CellRounded";
import { useCameraShake } from "../contexts/CameraShakeContext";
import { useRenderBillboard } from "../contexts/RenderBillboard";
import { useStore } from "../game/store";
import { isCellActiveOrGhost, rotateBlock } from "../game/blocks";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOX_SIZE,
  FAST_SPEED,
  NORMAL_SPEED,
} from "../game/constants";

export function Game() {
  const state = useStore();
  const cameraShake = useCameraShake();
  const billboard = useRenderBillboard();
  const [gameInterval, setGameInterval] = useState<number | null>(null);

  const startNewGame = () => {
    setGameInterval(NORMAL_SPEED);

    state.restart();
    state.updateBoard();
  };

  const canAddNewBlock = () => {
    return state.nextBlock?.path.every(
      (item) => !state.board[item[1]][item[0]]
    );
  };

  const canMoveDown = () => {
    return state.currentBlock?.path.every((item) => {
      if (item[1] + 1 >= BOARD_HEIGHT) {
        return false;
      }

      const cell = state.board[item[1] + 1][item[0]];

      return cell === "" || isCellActiveOrGhost(cell);
    });
  };

  const rotate = () => {
    const { path, defaultPath } = state.currentBlock!;
    const offsetLeft = path[0][0] - defaultPath[0][0];
    const offsetTop = path[0][1] - defaultPath[0][1];

    const next = rotateBlock(state.currentBlock!);

    next.path = next.path.map((item) => [
      item[0] + offsetLeft,
      item[1] + offsetTop,
    ]);

    const canRotate = next.path.every((item) => {
      if (
        item[0] < 0 ||
        item[0] >= BOARD_WIDTH ||
        item[1] < 0 ||
        item[1] >= BOARD_HEIGHT
      ) {
        return false;
      }

      const cell = state.board[item[1]][item[0]];

      return cell === "" || isCellActiveOrGhost(cell);
    });

    if (canRotate) {
      state.setCurrentBlock(next);
      state.updateBoard();
    }
  };

  const moveLeft = () => {
    const canMove = state.currentBlock?.path.every((item) => {
      const cell = state.board[item[1]][item[0] - 1];

      return cell === "" || isCellActiveOrGhost(cell);
    });

    if (canMove) {
      state.moveLeft();
      state.updateBoard();
    }
  };

  const moveRight = () => {
    const canMove = state.currentBlock?.path.every((item) => {
      const cell = state.board[item[1]][item[0] + 1];

      return cell === "" || isCellActiveOrGhost(cell);
    });

    if (canMove) {
      state.moveRight();
      state.updateBoard();
    }
  };

  const togglePause = () => {
    billboard.hide();

    if (state.gameOver) {
      startNewGame();

      return;
    }

    setGameInterval(state.gamePaused ? NORMAL_SPEED : null);

    // negation, because it's before state change
    if (!state.gamePaused) {
      billboard.show("Game paused");
    }

    state.toggleGamePause();
  };

  useEventListener("keydown", ({ key }) => {
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
      case "Escape":
        togglePause();
        break;

      default:
        break;
    }
  });

  useEventListener("keyup", ({ key }) => {
    if (key === "ArrowDown" && gameInterval) {
      setGameInterval(NORMAL_SPEED);
    }
  });

  useInterval(
    () => {
      if (!canMoveDown()) {
        // check can add a new block to the top of the board
        if (!canAddNewBlock()) {
          state.setGameOver();

          setGameInterval(null);

          billboard.show(`GAME OVER

Your score: ${state.score}

Press space bar to restart.`);

          return;
        }

        state.prepareForNext();
      } else {
        state.moveDown();
      }

      const clearedRows = state.updateBoard();

      if (clearedRows.length) {
        cameraShake.shake();
      }
    },
    gameInterval,
    { immediate: false }
  );

  useEffect(() => {
    billboard.show("Press space bar to start");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
