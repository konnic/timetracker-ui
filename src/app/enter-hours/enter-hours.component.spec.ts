import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterHoursComponent } from './enter-hours.component';
import {SettingsService} from '../settings/settings.service';
import {TimeInputComponent} from '../shared/time-input/time-input.component';
import {DropdownComponent} from '../shared/dropdown/dropdown.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {TimeConversionService} from '../shared/time-conversion/time-conversion.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('EnterHoursComponent', () => {
  let component: EnterHoursComponent;
  let fixture: ComponentFixture<EnterHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EnterHoursComponent,
        TimeInputComponent,
        DropdownComponent,
        DatePickerComponent ],
      providers: [
        SettingsService,
        TimeConversionService ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default times', () => {
    const startTimeInputEl: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('div div form div div:nth-child(2) app-time-input:nth-child(1) div div div input');
    const lunchBreakTimeInputEl: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('div div form div div:nth-child(2) app-time-input:nth-child(3) div div div input');

    expect(component.timeInputForm.value.start).toBe('08:30');
    expect(component.timeInputForm.value.lunchBreak).toBe('01:00');
    expect(startTimeInputEl.value).toEqual('08:30');
    expect(lunchBreakTimeInputEl.value).toEqual('01:00');
  });

  it('should trigger calcTotalTime when time is updated', () => {
    component.timeInputForm.patchValue({
      end: '18:00',
    });
    component.onTimeUpdate('end');
    expect(component.timeInputForm.value.total).toEqual('08:30');
  });

  it('should set currentTime', () => {
    component.setCurrentTime('end');
    expect(component.timeInputForm.value.end).toBeDefined();
    expect(component.timeInputForm.value.billable).toBeDefined();
    expect(component.timeInputForm.value.total).toBeDefined();
  });

  it('should set the day type and default times', () => {
    component.onDayTypeUpdate('Work');
    expect(component.timeInputForm.value.dayType).toBe('Work');
    expect(component.timeInputForm.value.start).toBe('08:30');
    expect(component.timeInputForm.value.lunchBreak).toBe('01:00');
  });

  it('should set the day type reset all times', () => {
    component.onDayTypeUpdate('Vacation');
    expect(component.timeInputForm.value.dayType).toBe('Vacation');
    expect(component.timeInputForm.value.start).toBe(null);
    expect(component.timeInputForm.value.lunchBreak).toBe(null);
    expect(component.timeInputForm.value.total).toBe(null);
  });

  it('should update the date', () => {
    const newDate = new Date();
    component.onDateUpdate(newDate);
    expect(component.timeInputForm.value.date).toBe(newDate);
  });
});
