import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: any;
  selectedImage: File | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/'+localStorage.getItem('username')).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user)
      },
      err => {
        // handle error here
      }
    );
  }

  updateDetails() {
    this.http.put('http://localhost:3000/api/'+this.user.id,this.user).subscribe(
      (res: any) => {
        // handle response here
        console.log(res)
      },
      err => {
        // handle error here
      }
    );
  }

  onImageSelected(event:any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage)
  }

  uploadImage() {
    if(this.selectedImage){

      const formData = new FormData();
      formData.append('image', this.selectedImage);
      
      this.http.put('http://localhost:3000/api/uploadImage/'+this.user.id, formData).subscribe(
        (res: any) => {
          // handle response here
        },
        err => {
          // handle error here
        }
        );
      }
  }
}
