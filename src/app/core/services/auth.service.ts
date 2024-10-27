import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, ObservableInput, retry, throwError } from 'rxjs';
import { Constant } from '../constant/constant';
import { APIResponse, LoginModel } from '../models/API.Models';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL;
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;
  
  constructor(
    private http: HttpClient,
    private route:Router
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(obj: LoginModel):Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}` + Constant.API_END_POINT.LOGIN,obj)
  };

  getTopicCount():Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}` + Constant.API_END_POINT.GET_TOPICS);
  };

  private getUserFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log(decoded)
        return decoded // Extract user information from token
      } catch (e) {
        // console.error('Invalid token', e);
      }
    }
    return {};
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next({});
    this.route.navigate(['/login'])
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); //returns true or false
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user && user.role === role;
  }

}
