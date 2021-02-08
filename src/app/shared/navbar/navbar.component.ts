import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() showNavPicker = new EventEmitter<boolean>();

  public toggleNavPicker(): void {
    this.showNavPicker.emit(true);
  }

  public login(): void {

  }
}
