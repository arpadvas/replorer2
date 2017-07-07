import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  domain = 'http://localhost:3000';

  constructor(
    private http: Http 
  ) { }

  storeHistoryEntry(historyEntry) {
    return this.http.post(this.domain + '/api/history/add', historyEntry).map(res => res.json());
  }

  getAllHistory() {
    return this.http.get(this.domain + '/api/history').map(res => res.json());
  }
  
}
