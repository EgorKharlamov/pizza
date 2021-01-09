export const formatDates = {
  yyyymmddhhmm: (date: Date) => {
    const resDate = new Date(date);
    const resYear = resDate.getFullYear();
    const resMonth = resDate.getMonth() + 1 < 10 ? `0${resDate.getMonth() + 1}` : resDate.getMonth() + 1;
    const resDay = resDate.getDate() < 10 ? `0${resDate.getDate()}` : resDate.getDate();
    const resHour = resDate.getHours() < 10 ? `0${resDate.getHours()}` : resDate.getHours();
    const resMinutes = resDate.getMinutes() < 10 ? `0${resDate.getMinutes()}` : resDate.getMinutes();
    const res = `${resYear}.${resMonth}.${resDay} ${resHour}:${resMinutes}`;
    return res;
  },
};
