import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  login:any;
  error:any;
  user = {
    email: '',
    password: ''
  };
  constructor(private http: HttpClient,private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/login?username='+this.user.email +'&password='+this.user.password, this.user).subscribe(
      (res: any) => {
        // handle response here
        
        this.login=res;
        console.log(this.login)
        localStorage.setItem('token','test');
        localStorage.setItem('username',this.login.user.username);

        this.router.navigate(['/home']);
      },
      err => {
        this.error=err.error.error;
        console.log(this.error)
      }
    );
  }
}
