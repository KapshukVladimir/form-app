import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private httpClient: HttpClient) {}

  public checkUser(username: string): Observable<{ isAvailable: boolean }> {
    return this.httpClient.post<{ isAvailable: boolean }>(
      '/api/checkUsername',
      {
        username,
      },
    );
  }

  public submitForm(formValues: any): Observable<any> {
    return this.httpClient.post('/api/submitForm', {
      formValues,
    });
  }
}
