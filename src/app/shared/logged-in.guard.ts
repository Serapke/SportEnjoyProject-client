import { Injectable } from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._loginService.isAdmin() && state.url !== '/login') {
      return true;
    }
    else if (this._loginService.isModerator() && this.showForModerator(state.url)) {
      return true;
    }
		else if (this._loginService.isLoggedIn() && this.showForLoggedInUser(state.url)) {
      return true;
    }
    else if (this._loginService.isLoggedIn() && !this.showForLoggedInUser(state.url)) {
      this.router.navigate(['profile']);
      return false;
    }
    else if (!this._loginService.isLoggedIn() && this.showForGuest(state.url)) {
      return true;
    }
    else {
      console.warn("Not authorized!");
      this.router.navigate(['login']);
      return false;
    }
  }

  private showForLoggedInUser(url: string): boolean {
    let spot_update_url = /spot\/\d+\/update/g;
    let user_url = /user\/\d+/g;
    if (url === '/login' || url === '/review' ||
        url.match(spot_update_url) !== null || url === '/users' ||
        url.match(user_url) !== null) {
      return false;
    }
    return true;
  }

  private showForGuest(url: string): boolean {
    if (url === '/profile' || url === '/add-spot' ||
        url === '/review'  || url.indexOf('update') > -1 ||
        url === '/users'   || url.indexOf('user') >-1) {
      return false;
    }
    return true;
  }

  private showForModerator(url: string): boolean {
    if (url === '/users' || url.indexOf('user') > -1 ||
        url === '/login') {
      return false;
    }
    return true;
  }
}
