import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertifyService } from '../alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate():  boolean {
    if (this.authService.loggedIn()) {
    return true;
    }

    this.alertify.error('You must be logged in to view that page');
    this.router.navigate(['/home']);
    return false;
  }
}
