import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Directory } from './types';

@Injectable({ providedIn: 'root' })
export class ServerService {
  private serverUrl = 'http://localhost:3000';
 
  constructor(private http: HttpClient) { }

  getDirectories(): Observable<Directory[]> {
    return this.http.get<Directory[]>(`${this.serverUrl}/files`);
  }

  getDirectoriesByPrefix(prefix:string): Observable<Directory[]> {
    return this.http.get<Directory[]>(`${this.serverUrl}/files`,
      { params: { q: prefix }} 
    );
  }
}
