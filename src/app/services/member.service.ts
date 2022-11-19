import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Member } from '@app/models/member';
import { environment } from '@environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    console.log(baseUrl)
    return this.http.get(baseUrl + '/members');
  }

  get(id:string): Observable<any> {
    let url = `${baseUrl}/members/id/${id}`;
    console.log(url)
    return this.http.get<Member>(url);
  }
}
