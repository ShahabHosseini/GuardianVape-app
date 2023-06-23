import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collection-type',
  templateUrl: './collection-type.component.html',
  styleUrls: ['./collection-type.component.scss'],
})
export class CollectionTypeComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  selectedCollectionType: string = 'manual';
  productTags!: string[];
  productTag!: string;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      collectionType: ['', Validators.required],
      conditionType: ['', Validators.required],
      condition: [''],
    });
  }
  ngOnInit() {
    // this.parentForm.addControl('collectionType', this.form);
    this.form = this.formBuilder.group({
      collectionType: ['manual'], // Default value for radio button selection
    });
  }
  isAutomated(): boolean {
    return this.form.get('collectionType')?.value === 'automated';
  }
  onProductTagChange(event: any) {}
}
