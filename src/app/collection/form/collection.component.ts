import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from 'src/app/base/transaction.service';
import { TitleDescriptionComponent } from 'src/app/components/form-component/title-description/title-description.component';
import { CollectionTypeComponent } from '../collection-type/collection-type.component';
import { SearchEngineComponent } from 'src/app/components/search-engine/search-engine.component';
import { ImageComponent } from 'ngx-editor/lib/modules/menu/image/image.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, AfterViewInit {
  collectionForm: FormGroup;
  selectAll: string = 'Deselect all';
  @ViewChild(TitleDescriptionComponent)
  titleDescriptionComponent!: TitleDescriptionComponent;
  @ViewChild(CollectionTypeComponent)
  collectionTypeComponent!: CollectionTypeComponent;
  @ViewChild(SearchEngineComponent)
  searchEngineComponent!: SearchEngineComponent;
  //@ViewChild(ImageComponent) imageComponent!: ImageComponent;
  titleDescriptionFormGroup!: FormGroup;
  collectionTypeFormGroup!: FormGroup;
  searchEngineFormGroup!: FormGroup;
  imageFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.collectionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      onlineStore: ['true', Validators.required],
      clickAndDrop: ['true', Validators.required],
      inbox: ['true', Validators.required],
      conditionType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.transactionService.saveClicked$.subscribe(() => {
      this.saveCollection();
    });

    this.transactionService.discardClicked$.subscribe(() => {
      this.resetForm();
    });
  }
  ngAfterViewInit() {
    // Accessing the child components after view initialization
    this.titleDescriptionFormGroup = this.titleDescriptionComponent.parentForm;
    this.collectionTypeFormGroup = this.collectionTypeComponent.parentForm;
    this.searchEngineFormGroup = this.searchEngineComponent.parentForm;
    // this.imageFormGroup = this.imageComponent.form;
  }

  saveCollection() {
    // if (this.collectionForm.valid) {
    //Perform save logic
    // console.log(this.titleDescriptionFormGroup);
    // console.log(this.collectionTypeFormGroup);
    // console.log(this.searchEngineFormGroup);
    //console.log(this.imageFormGroup);
    // } else {
    //   this.toast.error('Not Complite Error', 'You should fill form frist!');
    // }
    //console.log(this.titleDescriptionComponent);
    const titleDescriptionValue = this.titleDescriptionComponent.getData();
    const collectionTypeValue = this.collectionTypeComponent.getData();
    // const formData = this.titleDescriptionFormGroup.value.titleDescription;
    // console.log(this.titleDescriptionFormGroup.value.titleDescription);
    // Access the form data
    console.log('Title:', titleDescriptionValue.title);
    console.log('Description:', titleDescriptionValue.description);
    console.log('data:', collectionTypeValue);
  }

  resetForm() {
    this.collectionForm.reset();
    this.router.navigate(['/']);
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
