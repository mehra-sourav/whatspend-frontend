/**
 * Generates and returns a random color hex string
 *
 * @returns {string} Color Hex string
 */
export const getRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};
