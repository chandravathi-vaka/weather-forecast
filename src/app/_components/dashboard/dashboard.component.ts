import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    searchText: new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
  }

  handleFormSubmit() {
    console.log(this.form.value);
  }

}
