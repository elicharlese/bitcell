export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const truncateString = (string: string, maxLength: number): string => {
  if (string.length > maxLength) {
    return string.slice(0, maxLength) + '...';
  }
  return string;
};