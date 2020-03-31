
/**
 * An interface that represents the data related to one working day
 */

export interface DayModel {
  /** The date at hand */
  date: Date;

  /** The type of day at hand */
  dayType: 'Work' | 'Vacation' | 'Public Holiday' | 'Sick Day' | 'Overtime Reduction';

  /** Start time of working */
  startTime: string;

  /** End time of working */
  endTime: string;

  /** Total time of working */
  totalTime: string;

  /** The lunch break */
  lunchTime: string;

  /** Additional break time */
  breakTime: string;

  /** Time billable to the customer */
  billableTime: string;

  /** Tasks completed during the working day */
  tasks: string;
}
