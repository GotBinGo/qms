import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, retryWhen, switchMap, take, zip, map, catchError, delay, delayWhen } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.extendRequest(req)).pipe(catchError(this.errorHandler));
  }

  extendRequest = (req: HttpRequest<any>) => {
    const headersObj = {};

    headersObj['token'] = localStorage.token;

    return req.clone({
      withCredentials: true,
      headers: new HttpHeaders(headersObj)
    });
  }

  errorHandler = (x) => {
    if (x instanceof HttpErrorResponse) {
      console.log('HttpErrorResponse');
    } else {
      console.log('not HttpErrorResponse');
    }
    return throwError('');
  }
}
