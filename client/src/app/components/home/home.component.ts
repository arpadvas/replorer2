import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      keyword: ''
    })
  }

  onSearchSubmit() {
    console.log(this.form);
  }

  ngOnInit() {
  }

}
