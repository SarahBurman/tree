import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Directory } from './utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private serverUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

   getData(): Observable<Directory[]> {
    return this.http.get<Directory[]>(`${this.serverUrl}/files`);
  }
}
