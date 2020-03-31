import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TimeConversionService} from '../time-conversion/time-conversion.service';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent {
  @Input() time: string;
  @Input() title: string;
  @Input() showSetCurrentTimeText = false;
  @Input() readOnly = false;
  @Input() timeInputForm: FormGroup;
  @Input() formCtrName: string;
  @Input() isReadOnly = false;
  @Output() updatedTime = new EventEmitter<string>();
  @Output() setCurrentTime = new EventEmitter<string>();

  public activeInput = false;
  public tempTitleStore: string;
  public displayTitle = true;

  constructor(private timeConversionService: TimeConversionService) {
  }

  public updateTime(): void {
    this.time !== null && this.time !== '' ? this.time = this.timeConversionService.checkTimeStringFormat(this.time) : null;
    this.updatedTime.emit(this.formCtrName);
  }

  public onSetCurrentTime(): void {
    this.setCurrentTime.emit(this.formCtrName);
  }

  public toggleTitle(): void {
    if (this.displayTitle) {
      this.tempTitleStore = this.title;
      this.title = 'Set current time';
      this.displayTitle = false;
    } else {
      this.title = this.tempTitleStore;
      this.displayTitle = true;
    }
  }

  public toggleFocusBar(): void {
    if (!this.isReadOnly) {
      this.activeInput = !this.activeInput;
    }
  }

  /** Adds a colon as soon as the first two numbers were entered */
  public addColon(enteredTime): void {
    this.time = enteredTime.target.value;
    if (this.time.length === 2 && !this.time.includes(':')) {
      this.time = `${this.time}:`;
    }
  }
}
