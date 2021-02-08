import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() dropdownData: string[];
  @Input() timeInputForm: FormGroup;
  @Input() formCtrName: string;
  @Input() initialSelection: string;
  @Output() selectedOption = new EventEmitter<string>();

  public hideOptions = true;
  public selection: string;
  public arrowDownSrc = '../../../assets/img/i-arrow-down.png';

  constructor() {}

  ngOnInit() {
    if (this.initialSelection) {
      this.selection = this.dropdownData.filter(data => data === this.initialSelection ? data : null)[0];
    }
    this.selectedOption.emit(this.selection);
  }

  public toggleDisplay() {
    this.hideOptions = !this.hideOptions;
  }

  public onOptionSelect(option: string) {
    this.toggleDisplay();
    this.selection = option;
    this.selectedOption.emit(this.selection);
  }
}
