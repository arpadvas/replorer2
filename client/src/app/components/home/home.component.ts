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

    this.searchService.storeHistoryEntry(historyEntry).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
