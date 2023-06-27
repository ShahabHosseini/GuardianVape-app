import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  collectionForm: FormGroup;
  selectAll: string = 'Deselect all';

  constructor(private formBuilder: FormBuilder) {
    this.collectionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      onlineStore: ['true', Validators.required],
      clickAndDrop: ['true', Validators.required],
      inbox: ['true', Validators.required],
      conditionType: ['', Validators.required], // Add the 'conditionType' form control
    });
  }

  saveCollection() {
    if (this.collectionForm.valid) {
      // Perform save logic
      console.log(this.collectionForm.value);
    }
  }

  selectAllChange() {
    if (this.selectAll === 'Select all') {
      this.collectionForm.controls['onlineStore'].setValue(true);
      this.collectionForm.controls['clickAndDrop'].setValue(true);
      this.collectionForm.controls['inbox'].setValue(true);
    } else {
      this.collectionForm.controls['onlineStore'].setValue(false);
      this.collectionForm.controls['clickAndDrop'].setValue(false);
      this.collectionForm.controls['inbox'].setValue(false);
    }
  }

  onValueChange() {
    if (
      !this.collectionForm.controls['onlineStore'].value ||
      !this.collectionForm.controls['clickAndDrop'].value ||
      !this.collectionForm.controls['inbox'].value
    ) {
      this.selectAll = 'Select all';
    } else {
      this.selectAll = 'Deselect all';
    }
  }
}
