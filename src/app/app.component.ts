import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'timetracker';
  public showNavPicker = false;

  toggleNavPicker(showNavPicker: boolean) {
    this.showNavPicker = showNavPicker;
  }
}
