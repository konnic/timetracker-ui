import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickerSupportService {
  public hidePicker = new Subject();

  constructor() { }

  public closePicker(): void {
    this.hidePicker.next();
  }
}
