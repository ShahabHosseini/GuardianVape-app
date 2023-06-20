import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from 'src/app/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { TokenApiDto } from 'src/app/Model/token-api.dto';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: UserService,
    private toast: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    // this.start.load();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }, // "Bearer "+myToken
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            //this.router.navigate(['login'])
            //handle
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => err);
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokeApiModel = new TokenApiDto();
    tokeApiModel.accessToken = this.auth.getToken()!;
    tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokeApiModel).pipe(
      switchMap((data: TokenApiDto) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }, // "Bearer "+myToken
        });
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          this.toast.warning('Warning', 'Token is expired, Please Login again');
          this.router.navigate(['login']);
        });
      })
    );
  }
}
