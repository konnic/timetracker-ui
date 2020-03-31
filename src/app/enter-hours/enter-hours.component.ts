import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingsService } from '../settings/settings.service';
import { TimeConversionService } from '../shared/time-conversion/time-conversion.service';

@Component({
  selector: 'app-enter-hours',
  templateUrl: './enter-hours.component.html',
  styleUrls: ['./enter-hours.component.scss'],
})
export class EnterHoursComponent {
  public isSubmitDisabled = true;
  public timeInputForm: FormGroup;

  constructor(
    public timeInputSettingsService: SettingsService,
    private timeConversionService: TimeConversionService
  ) {

    // Initialize timeInputForm FormGroup
    this.timeInputForm = new FormGroup({
      date: new FormControl(),
      dayType: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      total: new FormControl(),
      lunchBreak: new FormControl(),
      otherBreak: new FormControl(),
      billable: new FormControl(),
      tasks: new FormControl()
    });
    this.setDefaultTimes(this.timeInputSettingsService.defaultTimes);
  }

  /** Fill form with available default values  */
  private setDefaultTimes(defaultTimes): void {
    // Create an array of key/value pairs from default data object, Set the default values for all present data
    Object.entries(defaultTimes).forEach(entry => {
      this.timeInputForm.patchValue({
        [entry[0]]: entry[1],
      });
    });
  }

  /** Calculate the total time from entered times */
  private calcTotalTime(): void {
    const currTimes = this.timeInputForm.value;

    // Check if start or end are null or an empty string
    if (currTimes.end && currTimes.start) {
      // Check if values are available for lunch break and other break or need to be set to 00:00
      !currTimes.lunchBreak ? currTimes.lunchBreak = '00:00' : null;
      !currTimes.otherBreak ? currTimes.otherBreak = '00:00' : null;

      // Calculate total hours and minutes
      const totalTime = this.timeConversionService.getTotalTime(currTimes.end, currTimes.start, currTimes.lunchBreak, currTimes.otherBreak);

      this.timeInputForm.patchValue({
        total: totalTime,
        billable: totalTime,
      });

      this.isSubmitDisabled = false;
    } else {
      this.isSubmitDisabled = true;
      console.warn('Start and end time must be set to calculate the total time!');
    }
  }

  public onTimeUpdate(origin: string): void {
    origin !== 'billable' ? this.calcTotalTime() : null;
    if (!this.timeInputForm.value.end) {
      this.timeInputForm.patchValue({
        total: null,
        billable: null
      });
    }
  }

  public setCurrentTime(targetKey: string) {
    const today = new Date();

    const newTime: string = this.timeConversionService.addLeadingZero(today.getHours(), today.getMinutes());

    this.timeInputForm.patchValue({
      [targetKey]: newTime,
    });
    this.calcTotalTime();
  }

  /** Set the time inputs to zero if selected day is not 'work' */
  public onDayTypeUpdate(selectedDay: string): void {
    this.timeInputForm.patchValue({
      dayType: selectedDay,
    });
    if (selectedDay !== 'Work') {
      this.timeInputForm.patchValue({
        start: null,
        end: null,
        total: null,
        lunchBreak: null,
        otherBreak: null,
        billable: null,
        tasks: null
      });
    } else {
      this.setDefaultTimes(this.timeInputSettingsService.defaultTimes);
    }
  }

  public onDateUpdate(selectedDate: Date): void {
    this.timeInputForm.patchValue({
      date: selectedDate,
    });
  }

  public onSubmit(): void {
    console.log('Form submitted ', this.timeInputForm.value);
  }
}
