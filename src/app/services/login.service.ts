import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Endpoints} from '../endpoints';

@Injectable()
export class LoginService {
  headers: Headers;

  /*constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }*/

/*  getUsersDb() {
    return this.http.get(Endpoints.serverBase)
      .map((res: Response) => res.json());

  } */
}
