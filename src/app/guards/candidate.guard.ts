import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CandiateGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue) {
      let payload = Object.assign({ id: 0, roles: [] }, jwt_decode(this.authService.currentUserValue.jwt));
      if (payload.roles[0].authority == 3) {
        return true;
      }
    }
    this.router.navigate(['401']);
    return false;
  }

}