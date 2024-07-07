export const formatDate = (date: Date, format: string): string => {
  // Implementation of date formatting
  // Example: Format as 'MM/DD/YYYY'
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getDifferenceInDays = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};