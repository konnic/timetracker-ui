import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }
  public defaultTimes: { start?: string, end?: string, lunchBreak?: string, otherBreak?: string, total?: string, billable?: string } = {
    start: '08:30',
    end: null,
    lunchBreak: '01:00',
    otherBreak: null,
    total: null,
    billable: null
  };

  public timeInputSettings: {formCtrName: string, title: string, time: string, readonly?: boolean, enableSetTime?: boolean}[] = [
    {
      formCtrName: 'start',
      title: 'Start',
      time: this.defaultTimes.start,
      enableSetTime: true,
    },
    {
      formCtrName: 'end',
      title: 'End',
      time: this.defaultTimes.end,
      enableSetTime: true,
    },
    {
      formCtrName: 'lunchBreak',
      title: 'Lunch Break',
      time: this.defaultTimes.lunchBreak,
    },
    {
      formCtrName: 'otherBreak',
      title: 'Other Break',
      time: this.defaultTimes.otherBreak,
    },
    {
      formCtrName: 'billable',
      title: 'Billable',
      time: this.defaultTimes.billable
    },
    {
      formCtrName: 'total',
      title: 'Total',
      time: this.defaultTimes.total,
      readonly: true
    }
  ];

  public dayOptions: string[] = [
    'Work', 'Vacation', 'Public Holiday', 'Sick Day', 'Overtime Reduction'
  ];
}
