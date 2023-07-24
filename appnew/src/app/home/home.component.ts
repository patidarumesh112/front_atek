import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    console.log(localStorage.getItem('username'));

    this.http.get('http://localhost:3000/api/'+localStorage.getItem('username')).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user);
      },
      err => {
        // handle error here
      }
    );
  }

  logout() {
    this.http.get('http://localhost:3000/api/user/logout').subscribe(
      (res: any) => {
localStorage.clear();
this.router.navigate(['login']);      },
      err => {
        // handle error here
      }
    );
  }
}
