export function getRandomElement<T = unknown>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}
