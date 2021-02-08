import {Component} from '@angular/core';
import {PickerSupportService} from '../../picker/picker-support.service';

@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.scss']
})
export class VerticalNavComponent {
  constructor(private pickerSupportService: PickerSupportService) { }

  selectRoute() {
    this.pickerSupportService.closePicker();
  }
}
