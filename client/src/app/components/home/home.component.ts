import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  items = undefined;
  total_count: number = 0;
  currentPage: number = 1;
  maxSize: number = 10;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService 
  ) { 
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      keyword: ''
    })
  }

  onSearchSubmit() {

    const historyEntry = {
      keyword: this.form.get('keyword').value
    }

    let searchKeyWord: string = this.form.get('keyword').value;

    this.searchService.storeHistoryEntry(historyEntry).subscribe(data => {
      console.log(data);
    });

    this.searchService.getFindings(searchKeyWord, 1).subscribe(data => {
      this.items = data.items;
      this.total_count = data.total_count;
    });

  }

  pageChanged(event:any):void {
    let searchKeyWord: string = this.form.get('keyword').value;
    this.searchService.getFindings(searchKeyWord, event.page).subscribe(data => {
      this.items = data.items;
      this.total_count = data.total_count;
    });
  }

  ngOnInit() {
  }

}
