export const hoursToHoursAndMinutes =(stringHours: string): string => {
  const floatHours: number = parseFloat(stringHours);
  const hours: number = Math.floor(floatHours);
  const minutes: number = Math.round((floatHours - hours) * 60);

  let reusult: string = '';

  if (hours > 0) {
    reusult += `${hours} h `;
  }

  if (minutes > 0) {
    reusult += `${minutes} min`;
  }

  return reusult ? reusult : 'unknown';
}