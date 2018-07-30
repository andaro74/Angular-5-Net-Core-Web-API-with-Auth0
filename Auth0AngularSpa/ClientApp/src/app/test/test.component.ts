import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  API_URL = 'https://localhost:44394/api/test';
  message: string;

  constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
  }

  public ping(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/public`)
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

  public securedPing(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/private`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

  public securedPrivatePing(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/private-scoped`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

}
