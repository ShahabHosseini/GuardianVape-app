import { Component, EventEmitter, Output, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { ImageDto } from 'src/app/Model/image-dto';
import { CommonService } from 'src/app/api/Common/common.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Output() imageSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() imageRemoved: EventEmitter<void> = new EventEmitter<void>();
  @Input() showImageEdge: boolean = true;
  @Input() imageUrl: string | null = null;
  imageForm: FormGroup;
  isImageSelected: boolean = false;
  fileName: string = '';
  guid: string = '';
  image: File | null = null; // Update the type to allow null values
  textFile?: string;
  constructor(
    private formBuilder: FormBuilder,
    private common: CommonService,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {
    this.imageForm = this.formBuilder.group({
      imageFile: [''],
      url: [''],
    });
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0];
      this.image = file; // Store the selected image

      this.displayImage(file);

      // Emit the selected image to the parent component
      this.imageSelected.emit(file);

      // Set the value of the form control to an empty string
      this.imageForm.get('imageFile')?.setValue('');

      // Create a new instance of FormGroup
      const form = this.formBuilder.group({
        imageFile: [''],
        url: [''],
      });

      // Replace the existing form group
      this.imageForm = form;

      this.isImageSelected = true;
    }
  }

  displayImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.imageUrl = event.target?.result as string;
      console.log(event.target);
    };
    this.fileName = file.name;
    reader.readAsDataURL(file);
    this.guid = this.common.newGuid();
  }

  removeImage(): void {
    // Clear the image URL and emit the remove event to the parent component
    this.imageUrl = null;
    this.imageRemoved.emit();
    this.isImageSelected = false;
    this.image = null;
    this.guid = '';
  }

  showInputFile(): void {
    const fileInput = document.getElementById(
      'imageFile'
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }
  onImageDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    this.image = file as File; // Store the selected image

    if (file) {
      this.displayImage(file);
      this.imageForm.get('imageFile')?.setValue('');
      this.isImageSelected = true;
    }
  }
  resetR() {
    this.removeImage();
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  getData(): ImageDto {
    const imagedto: ImageDto = {
      file: this.image, // Use the stored image directly
      name: this.fileName,
      url: this.imageUrl || '', // You can remove this line as it's not needed
      caption: '',
      description: '',
      alt: '',
      guid: this.guid,
      uploadDate: new Date(),
      width: 0,
      height: 0,
    };
    return imagedto;
  }
  setData(image: ImageDto | undefined) {
    if (image) {
      this.fileName = image.name;
      this.imageUrl = image.url;
      this.image = image.file; // Store the image file
      this.isImageSelected = true;
      this.guid = image.guid;
    } else {
      // Clear the image details
      this.fileName = '';
      this.imageUrl = null;
      this.image = null;
      this.isImageSelected = false;
      this.guid = '';
    }
    console.log('image:', image);
  }
}
