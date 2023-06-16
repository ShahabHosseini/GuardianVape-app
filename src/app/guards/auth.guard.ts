import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../User/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: UserService,
    private toast: ToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.service.isLogin(); // Assuming you have a method to retrieve the token from your AuthService

    if (token) {
      console.log(this.service.getToken());
      // Token is present, allow navigation
      return true;
    } else {
      this.toast.error('Error', 'You should login first!');
      this.router.navigate(['login']);
      // Token is not present, redirect to login page or any other desired action
      // For example, you can navigate to a login page:
      return false;
    }
  }
}
