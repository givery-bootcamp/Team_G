export const createDateString = (baseDate: Date): string => {
  const year: string = String(baseDate.getFullYear());
  const month: string = String(baseDate.getMonth());
  const day: string = String(baseDate.getDay());
  const timeH: string = String(baseDate.getHours());
  const timeM: string = String(baseDate.getMinutes());
  const timeS: string = String(baseDate.getSeconds());
  return year + "-" + month + "-" + day + " " + timeH + ":" + timeM + ":" + timeS;
};
