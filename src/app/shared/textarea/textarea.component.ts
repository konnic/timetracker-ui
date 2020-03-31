import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() timeInputForm: FormGroup;
  @Input() formCtrName: string;
  @Input() formGrpName: any;

  public activeInput = false;

  constructor() { }

  public toggleFocusBar(): void {
    this.activeInput = !this.activeInput;
  }
}
