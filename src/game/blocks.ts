import { ALL_BLOCKS, ACTIVE_CELL_SUFFIX, BOARD_WIDTH } from "./constants";
import { getRandomElement } from "./utils";

type BlockPathDimention = [x: number, y: number];

export type Block = {
  id: string;
  color: string;
  width: number;
  paths: BlockPathDimention[][];
};

export type BlockMetadata = Block & {
  rotationIndex: number;
  path: BlockPathDimention[];
  defaultPath: BlockPathDimention[];
};

export function getRandomBlock(): BlockMetadata {
  const randomBlock = getRandomElement(ALL_BLOCKS);
  const randomRotation = getRandomElement(randomBlock.paths);

  return {
    ...randomBlock,
    path: randomRotation,
    defaultPath: randomRotation,
    rotationIndex: randomBlock.paths.indexOf(randomRotation),
  };
}

export function getRandomBlockAndCenter(boardWidth: typeof BOARD_WIDTH) {
  const block = getRandomBlock();
  const xAxisMargin = Math.floor((boardWidth - block.width) / 2);
  const yAxisMargin = block.path.reduce(
    (prev, curr) => (curr[1] < prev ? curr[1] : prev),
    Infinity
  );

  block.path = block.path.map((row) => [
    row[0] + xAxisMargin,
    row[1] - yAxisMargin,
  ]);

  return block;
}

export function rotateBlock(block: BlockMetadata) {
  let newRotationIndex = block.rotationIndex + 1;
  let newPath = block.paths[newRotationIndex];

  if (!newPath) {
    newRotationIndex = 0;
    newPath = block.paths[0];
  }

  return {
    ...block,
    path: newPath,
    defaultPath: newPath,
    rotationIndex: newRotationIndex,
  };
}

export function getBlockWidth(path: BlockPathDimention[]) {
  const xAxisOffset = path.reduce(
    (prev, curr) => (curr[0] < prev ? curr[0] : prev),
    Infinity
  );

  const maxX = path.reduce(
    (prev, curr) => (curr[0] > prev ? curr[0] : prev),
    0
  );

  return maxX - xAxisOffset + 1;
}

export function getColorById(id: Block["id"]) {
  return ALL_BLOCKS.find((item) => item.id === id || id.startsWith(item.id))
    ?.color;
}

export function isCellActive(cell: string) {
  return cell.endsWith(ACTIVE_CELL_SUFFIX);
}
