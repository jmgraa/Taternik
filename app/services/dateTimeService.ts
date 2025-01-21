export default class DateTimeService {
  public static hoursToHoursAndMinutes(stringHours: string): string {
    const floatHours: number = parseFloat(stringHours);
    const hours: number = Math.floor(floatHours);
    const minutes: number = Math.round((floatHours - hours) * 60);

    let result: string = '';

    if (hours > 0) {
      result += `${hours} h `;
    }

    if (minutes > 0) {
      result += `${minutes} min`;
    }

    return result ? result : 'unknown';
  }
}
