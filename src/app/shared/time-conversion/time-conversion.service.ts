import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeConversionService {

  constructor() { }

  /**
   * Calculates total time from end, start, lunch break and other break time
   *
   * @param times the time values in the following order: end, start, lunch break, other break
   */
  public getTotalTime(...times): string {
    const hours: number[] = times
      .map( time => parseInt(time.substring(0, 2), 10) );

    const totalHours: number = hours[0] + hours.reduce((a, b) => {
        return a - b;
      } , hours[0]);

    const minutes: number[] = times
      .map( time => parseInt(time.substring(3, 5), 10) );

    const totalMinutes: number = minutes[0] + minutes.reduce((a, b) => {
        return a - b;
      }, minutes[0]);

    if (totalMinutes < 0) {
      return this.convertNegativeMinutes(totalHours, totalMinutes);
    } else {
      return this.addLeadingZero(totalHours, totalMinutes);
    }
  }

  /**
   * Converts negative minutes from getTotalTime() into hours and minutes accordingly and subtracts
   * those conversions from the totalHours and totalMinutes result to come to the correct total time
   *
   * @param totalHours totalHours calculated in getTotalTime()
   * @param totalMinutes totalMinutes calculated in getTotalTime()
   */
  private convertNegativeMinutes(totalHours: number, totalMinutes: number): string {
    // working element for minutes conversion
    let convertedMinutes: any;
    const minutesInHours = ((totalMinutes / 60) * (-1));

    // subtract full hours of minutesInHours and 1 hour for minute remainder
    totalHours = totalHours - (Math.floor(minutesInHours) + 1);

    // convert minute remainder, into minutes to calculate totalMinutes
    convertedMinutes = minutesInHours.toString().split('.')[1];
    convertedMinutes = parseFloat(`0.${convertedMinutes}`) * 60;
    convertedMinutes = Math.round(convertedMinutes);
    totalMinutes = 60 - convertedMinutes;
    return this.addLeadingZero(totalHours, totalMinutes);
  }

  /**
   * Adds a zero in front of single digit hours, minutes
   *
   * @param hours hours of time
   * @param minutes minutes of time
   */
  public addLeadingZero(hours: number, minutes: number): string {
    if (hours < 0 || minutes < 0) {
      console.error('Received negative hour or minutes value and stopped correctTimeFormat()');
    } else {
      const hoursFormatted: string = hours < 10 ? `0${ hours }` : hours.toString();
      const minutesFormatted: string = minutes < 10 ? `0${ minutes }` : minutes.toString();
      return `${ hoursFormatted }:${ minutesFormatted }`;
    }
  }

  public checkTimeStringFormat(timeString: string): string {
    let hours: number;
    let minutes: number;
    let correctedTimeString: string;

    if (timeString.includes(':')) {
      hours = parseInt(timeString.split(':')[0], 10);
      minutes = parseInt(timeString.split(':')[1], 10);
      // ensure that no leading zero is missing
      correctedTimeString = this.addLeadingZero(hours, minutes);
    } else {
      return null;
    }

    return correctedTimeString;
  }
}
