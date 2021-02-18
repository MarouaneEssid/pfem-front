import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { navItems } from '../../_nav';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'default-layout.component.html',
  styleUrls: ['default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems;
  constructor(private authenticationService: AuthenticationService, private router : Router) {}

  ngOnInit(): void {
    let payload = Object.assign({id: null, roles:[]}, this.decodeCurrentUser());
    let role = Number(payload.roles[0].authority);
    switch (role) {
      case 1:
        this.navItems = [navItems[0], navItems[2], navItems[3]];
        break;
      case 2:
        this.navItems = [navItems[0], navItems[1], navItems[2], navItems[4]];
        break;
      default:
        this.navItems = [navItems[0], navItems[2]];
        break;
    }
  }

  decodeCurrentUser() {
    return jwt_decode(this.authenticationService.currentUserValue.jwt);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authenticationService.logout();
  }
  profile (){
    this.router.navigate(['userProfile']);
  }

}
