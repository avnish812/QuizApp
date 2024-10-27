import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfileserService {
  apiUrl = 'http://localhost:30105/api/user/';

  constructor(private http: HttpClient) { }

  fileUpload(file: any) {
    const fd = new FormData();
    fd.append("file", file, file.name);
    return this.http.post<any>('http://localhost:30105/api/file', fd)
  };
}
