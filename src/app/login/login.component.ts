import { Component } from '@angular/core';
import { HttpRequestService } from '../shared/http-request/http-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string;
  public password: string;
  public success: string;

  constructor(private httpRequestService: HttpRequestService) {
  }

  public login(): void {
    const requestBody = {
      name: this.username,
      password: this.password
    };
    this.httpRequestService.postRequest('login', requestBody).subscribe(response => {
      console.log(response);
      typeof response === 'number' ? this.success = 'Logged in' : this.success = 'Log in failed';
    });
  }
}
