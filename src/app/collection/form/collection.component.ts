import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { interval } from 'rxjs';
import { BaseFormComponent } from 'src/app/base/base-form.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit
{
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
  imageGuid?: string;
  collection?: CollectionDto;
  guid: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private toast: ToastrService,
    private http: HttpClient,
    private fileService: FileService,
    private service: CollectionService,
    private common: CommonService,
    private activatedRoute: ActivatedRoute
  ) {
    super();

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
    const param = this.activatedRoute.snapshot.paramMap.get('guid');
    console.log('param:', param);
    if (param) {
      this.setMode('edit');
      this.loadCollectionForEdit(param);
    }
  }
  ngAfterViewInit() {
    // Accessing the child components after view initialization
    this.titleDescriptionFormGroup = this.titleDescriptionComponent.parentForm;
    this.collectionTypeFormGroup = this.collectionTypeComponent.parentForm;
    this.searchEngineFormGroup = this.searchEngineComponent.form;
    this.imageFormGroup = this.imageComponent.imageForm;
  }
  loadCollectionForEdit(guid: string) {
    this.service.getCollection(guid).subscribe({
      next: (res) => {
        this.toast.success('Success', 'Data fetched successfully');
        this.collection = res;

        // Now 'this.collection' has the fetched data
        this.titleDescriptionComponent.setData(
          this.collection.titleDescription
        );
        this.collectionTypeComponent.setData(this.collection.collectionType);
        // this.imageComponent.setImageData(this.collection.image);
        console.log('this.collection', this.collection);
      },
      error: (err) => {
        this.toast.error('Error', 'Something Happened');
      },
    });

    // Code here will execute before the data is fetched, so 'this.collection' will be undefined
  }
  async saveCollection() {
    debugger;
    try {
      // if (this.collectionForm.valid) {
      const titleDescriptionValue = this.titleDescriptionComponent.getData();
      const collectionTypeValue = this.collectionTypeComponent.getData();
      let image = this.imageComponent.getData();
      if (this.mode == 'edit') {
        this.guid = this.activatedRoute.snapshot.paramMap.get('guid') || '';
      } else {
        this.guid = '';
      }
      await this.saveImage();
      let collection: CollectionDto = {
        guid: this.guid,
        titleDescription: titleDescriptionValue,
        collectionType: collectionTypeValue,
        image: undefined,
      };
      console.log('Data:', collection);
      if (this.mode == 'new') {
        //do fo New mode
        const observable = await this.service.save(collection);
        observable.subscribe({
          next: (res) => {
            this.toast.success('SUCCESS', 'SUCCESS');
            this.collectionForm.reset();
            // this.titleDescriptionFormGroup.resetr('');
            // this.collectionTypeFormGroup.resetr('');
            this.collectionTypeComponent.resetR();
            this.imageComponent.resetR();
            //this.router.navigate(['/']);
          },
          error: (err) => {
            this.toast.error('ERROR', err.error);
          },
        });
      } else if (this.mode == 'edit') {
        const observable = await this.service.update(collection);
        observable.subscribe({
          next: (res) => {
            this.toast.success('SUCCESS', 'SUCCESS');
            this.collectionForm.reset();
            // this.titleDescriptionFormGroup.resetr('');
            // this.collectionTypeFormGroup.resetr('');
            this.collectionTypeComponent.resetR();
            this.imageComponent.resetR();
            //this.router.navigate(['/']);
          },
          error: (err) => {
            this.toast.error('ERROR', err.error);
          },
        });
      }
    } catch (err) {
      this.toast.error('Error');
    }
  }

  goToList() {
    this.router.navigate(['collection-list']);
  }

  async saveImage() {
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
      this.imageGuid = newImage.guid;
      let formdata = new FormData();
      let imageName = 'Collection\\' + newImage.name;
      formdata.append(newImage.guid, newImage.file, imageName);
      await this.fileService
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
