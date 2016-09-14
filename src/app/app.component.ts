import { Component } from '@angular/core';
import { SpotService } from './spots/spot.service';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TextTransformService } from './shared/text-transform.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginService } from './login/login.service';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  template: `
    <ng-header></ng-header>
    <router-outlet></router-outlet>
    <ng-footer></ng-footer>
  `,
  directives: [
    HeaderComponent,
    FooterComponent,
    ROUTER_DIRECTIVES
  ],
  providers: [
    SpotService,
    TextTransformService,
    LoginService,
    UserService
  ]
})
export class AppComponent {

}
