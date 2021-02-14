import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'timetracker';
  public prod: boolean = environment.production;

  constructor() {
    console.log(this.prod ? 'PROD BUILD' : 'DEV BUILD');
  }
}
