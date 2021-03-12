export function getRandomElement<T = any>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}