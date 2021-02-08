import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PickerSupportService} from './picker-support.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent {
  @Input() pickerWidth = 400;
  @Input() orientationLeft = true;
  @Input() title = 'Title';

  @Output() showNavPicker = new EventEmitter<boolean>();

  public slideoutAnimationActive = false;
  public showPickerSubscription: Subscription;

  constructor(private pickerSupportService: PickerSupportService) {
    this.showPickerSubscription = pickerSupportService.hidePicker.subscribe(hidePicker => this.closePicker());
  }

  public closePicker(): void {
    this.slideoutAnimationActive = true;
    this.showPickerSubscription.unsubscribe();

    // Finish slide out animation before closing the picker
    setTimeout(() => this.showNavPicker.emit(false), 900);
  }
}
