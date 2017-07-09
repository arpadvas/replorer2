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

  getFindings(searchKeyword: string, pageCounter: number) {
    return this.http.get('https://api.github.com/search/repositories?q=' + searchKeyword + '+in:name&page=' + pageCounter + '&per_page=10&client_id=6e303c649bfb56aa4a37&client_secret=ce8f3ecdb7ddb4ba18ed55ee07fdc416a91bc0a9').map(res => res.json());
  }
  
}
