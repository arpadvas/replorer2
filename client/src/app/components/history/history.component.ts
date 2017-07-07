import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history;

  constructor(
    private searchService: SearchService
  ) { }

  getAllHistory() {

    this.searchService.getAllHistory().subscribe(data => {
      this.history = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.getAllHistory();
  }

}
