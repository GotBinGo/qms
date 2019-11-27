import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, retryWhen, switchMap, take, zip, map, catchError, delay, delayWhen } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Exception } from '@zxing/library';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private matSnackBar: MatSnackBar) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req =  req.clone({
      withCredentials: true,
      headers: req.headers.append('token', localStorage.token || '')
    });
    return next.handle((req)).pipe(catchError(this.errorHandler));
  }

  extendRequest = (req: HttpRequest<any>) => {
  }

  errorHandler = (x) => {
    if (x instanceof HttpErrorResponse) {
      if (x.status === 504) {
        this.matSnackBar.open('Server not available.', '', { duration: 2000 });
      } else {
        if (x.error.errors && x.error.errors.errors && x.error.errors.errors.length) {
          this.matSnackBar.open(x.error.errors.errors[0].messages[0], '', { duration: 2000 });
        } else {
          this.matSnackBar.open(x.error.message, '', { duration: 2000 });
        }
      }
    } else {
      console.log('not HttpErrorResponse', x);
    }
    throw(new Exception('Network Error'));
  }
}
