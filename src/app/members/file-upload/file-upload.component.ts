import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/auth.service';
import { Photo } from 'src/app/_models/photo';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() photos: Photo[];

  photo: Photo;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

   fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
    console.log(this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos');
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, tatus, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        this.photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(this.photo);
        if (this.photo.isMain) {
          this.authService.changeMemberPhoto(this.photo.url);
          this.authService.currentUser.photoUrl = this.photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  ngOnInit() {
    this.initializeUploader();
    console.log(this.photos);
  }

  constructor(private authService: AuthService) {

  }

}
