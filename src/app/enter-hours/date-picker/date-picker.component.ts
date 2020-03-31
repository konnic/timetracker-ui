import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  value: Date;
  @Output() selectedDate = new EventEmitter<Date>();
  constructor() { }

  ngOnInit() {
    this.value = new Date();
    this.selectedDate.emit(this.value);
  }

  onDateSelect(date) {
    this.selectedDate.emit(date);
  }
}
