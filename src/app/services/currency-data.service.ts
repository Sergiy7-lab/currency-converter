import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {

  constructor(private http: HttpClient) {
  }

  getCurrency(country: string): Observable<any>{
  let url = `https://api.exchangerate.host/latest?base=${country}`
    return this.http.get(url)
  }
}
