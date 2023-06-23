import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleDescriptionComponent } from '../../components/form-component/title-description/title-description.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  collectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.collectionForm = this.formBuilder.group({
      titleDescription: this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      }),
    });
  }

  saveCollection() {
    if (this.collectionForm.valid) {
      // Perform save logic
      console.log(this.collectionForm.value);
    }
  }
}
