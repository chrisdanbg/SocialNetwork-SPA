import { AuthService } from 'src/app/auth.service';
import { Photo } from './../../_models/photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  currentMainPhoto: Photo;
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService,
      private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    console.log(this.user);
  }

  setMain(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.alertify.success('Main photo successfuly changed.');
      this.currentMainPhoto = this.photos.filter(x => x.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;

      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      console.log('Error updating photo!');
    });
  }

  deletePhoto(photo: Photo) {
    this.userService.deletePhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      console.log('photo deleted');
      this.photos = this.photos.filter(x => x.id !== photo.id);
    }, error => {
      console.log(error);
    });
  }
}
