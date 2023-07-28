import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from 'src/app/base/transaction.service';
import { TitleDescriptionComponent } from 'src/app/components/form-component/title-description/title-description.component';
import { CollectionTypeComponent } from '../collection-type/collection-type.component';
import { SearchEngineComponent } from 'src/app/components/search-engine/search-engine.component';
import { ImageComponent } from 'src/app/components/form-component/image/image.component';
import { HttpClient } from '@angular/common/http';
import { FileService } from 'src/app/api/Common/file.service';
import { firstValueFrom } from 'rxjs';
import { CollectionDto } from 'src/app/Model/collection-dto';
import { CollectionService } from '../collection.service';
import { ImageDto } from 'src/app/Model/image-dto';
import { CommonService } from 'src/app/api/Common/common.service';

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
  @ViewChild(ImageComponent) imageComponent!: ImageComponent;
  titleDescriptionFormGroup!: FormGroup;
  collectionTypeFormGroup!: FormGroup;
  searchEngineFormGroup!: FormGroup;
  imageFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private toast: ToastrService,
    private http: HttpClient,
    private fileService: FileService,
    private service: CollectionService,
    private common: CommonService
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
    this.searchEngineFormGroup = this.searchEngineComponent.form;
    this.imageFormGroup = this.imageComponent.imageForm;
  }

  saveCollection() {
    try {
      // if (this.collectionForm.valid) {
      const titleDescriptionValue = this.titleDescriptionComponent.getData();
      const collectionTypeValue = this.collectionTypeComponent.getData();
      let image = this.imageComponent.getData();
      let collection: CollectionDto = {
        titleDescription: titleDescriptionValue,
        collectionType: collectionTypeValue,
      };
      this.saveImage();
      console.log('Data:', collection);
      this.service.save(collection).subscribe({
        next: (res) => {
          this.collectionForm.reset();
          this.toast.success('SUCCESS', res.message);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toast.error('ERROR', err.error);
        },
      });
      // } else {
      //   this.toast.error('Not Complite Error', 'You should fill form frist!');
      // }
    } catch {
      this.toast.error('Error', 'Somthing wrong happend!');
    }
  }

  saveImage() {
    const imageInfo: ImageDto = this.imageComponent.getData();
    console.log('Image : ', imageInfo.file);
    if (imageInfo.file) {
      const fileName = imageInfo.name || 'default.jpg';
      const newImage: ImageDto = {
        name: fileName,
        guid: this.common.newGuid(),
        alt: '',
        url: '',
        caption: '',
        description: '',
        file: imageInfo.file,
        uploadDate: new Date(),
        width: 0,
        height: 0,
      };
      let formdata = new FormData();
      let imageName = 'Collection\\' + newImage.name;
      formdata.append(newImage.guid, newImage.file, imageName);
      this.fileService
        .uploadFile(formdata)
        .then((response) => {
          this.toast.success('Image saved successfully');
          // You can perform additional logic here, such as updating the collection with the saved image URL
        })
        .catch((error) => {
          console.log('Error saving image:', error);
          // Handle the error appropriately
        });
    } else {
      this.toast.error('No image selected');
    }
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
