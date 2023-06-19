import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/User/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.userService.getToken();
    if (myToken) {
      request = request.clone({
        // setHeaders: { Autorization: `Bearer ${myToken}` },
        setHeaders: { Authorization: `Bearer ${myToken}` }, // "Bearer "+myToken
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpHeaderResponse) {
          if (err.status === 401) {
            this.toast.warning(
              'Token Is Expire',
              'Token is expire please login again'
            );
            this.router.navigate(['login']);
          }
        }
        throw throwError(() => new Error('Other Error'));
      })
    );
  }
}
