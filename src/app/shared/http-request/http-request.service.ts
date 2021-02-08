import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfiguredUrls } from '../models/configured-urls';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private urls: ConfiguredUrls | object;

  constructor(private http: HttpClient) {
    // Load URLs defined in config.json
    this.http.get('assets/config.json').subscribe(config => {
      this.urls = config;
      console.log(this.urls);
    });
  }

  public getRequest(context: string): Observable<any> {
    const path = this.getMatchingPath(context);
    return this.http.get(path)
      .pipe(
        catchError(this.handleError)
      );
  }

  public postRequest(context: string, body): Observable<any> {
    const path = this.getMatchingPath(context);
    console.log(path);
    return this.http.post(path, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  private getMatchingPath(context: string): string {
    return this.urls[context];
  }

  /**
   * Handle error method copied from angular.io
   *
   * @param error http error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
