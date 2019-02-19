import { AlertifyService } from 'src/app/alertify.service';
import { AuthService } from './../../auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('User ' + this.user.knownAs + ' Liked');
    }, error => {
      this.alertify.error(error);
    });
  }
}
