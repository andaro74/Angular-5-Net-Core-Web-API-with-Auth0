import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';


//interface UserClaim {
//  type: string;
//  value: string;
//}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  API_URL = 'https://localhost:44394/api/users';
  public profile: any;
  private http: HttpClient;

  constructor(public auth: AuthService, http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
    this.http.get<any>(`${this.API_URL}/userinfo`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    }).subscribe(result => {
      this.profile = result;
    }, error => console.error(error));
  }

}


