import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss'],
})
export class SearchEngineComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      collectionType: ['', Validators.required],
      conditionType: ['', Validators.required],
      condition: [''],
    });
  }
  ngOnInit(): void {}
}
