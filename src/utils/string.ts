export const dateTime = (date: string) => {
  return `${new Date(new Date(date).setUTCHours(3)).toLocaleDateString()} às ${new Date(
    date
  ).toLocaleTimeString()}`;
};

export const simpleDate = (date: string) => {
  return `${new Date(new Date(date).setUTCHours(3)).toLocaleDateString()}`;
};
