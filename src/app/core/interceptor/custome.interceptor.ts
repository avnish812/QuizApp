import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class CustomeInterceptor implements HttpInterceptor {

  constructor(private notify:NotificationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loginToken = localStorage.getItem('token')
    if (loginToken) {
      const newClonerequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${loginToken}`
        }
      })
      return next.handle(newClonerequest);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error Occured';
        if (error.error instanceof ErrorEvent) {
          // client side error
          errorMessage = `Client Side Error :${error.error.message}`;

          if (!navigator.onLine) {
            // Handle offline error
            errorMessage = 'No Internet Connection';
          }
        } else {
          // server side error
          errorMessage = `Server Side Error :${error.status}\nMessage:${error.message}`;

          // Handle non-JSON response if necessary
          if (error.status === 200 && typeof error.error === 'string') {
            try {
              const jsonResponse = JSON.parse(error.error);
              errorMessage = `Error : ${jsonResponse.message}`
            }catch{
              errorMessage =  `Error : ${error.error}`
            }
          }
        }
        this.notify.showError(errorMessage);
        return throwError(()=>new Error(errorMessage))
      })
    )
  }
}
