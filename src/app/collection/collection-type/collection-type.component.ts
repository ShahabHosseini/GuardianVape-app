import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collection-type',
  templateUrl: './collection-type.component.html',
  styleUrls: ['./collection-type.component.scss'],
})
export class CollectionTypeComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      collectionType: ['', Validators.required],
      conditionType: ['', Validators.required],
      condition: [''],
    });
  }
  ngOnInit() {
    this.parentForm.addControl('collectionType', this.form);
  }
}
