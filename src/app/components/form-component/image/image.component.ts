import { Component, EventEmitter, Output, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

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
  image: File | null = null; // Update the type to allow null values
  constructor(
    private formBuilder: FormBuilder,
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
  }

  removeImage(): void {
    // Clear the image URL and emit the remove event to the parent component
    this.imageUrl = null;
    this.imageRemoved.emit();
    this.isImageSelected = false;
    this.image = null;
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

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  getData(): imageDto {
    const imagedto: imageDto = {
      image: this.image || null, // Use the stored image directly
      fileName: this.fileName,
      url: '', // You can remove this line as it's not needed
    };
    return imagedto;
  }
}
export interface imageDto {
  image: File | null;
  fileName: string | null;
  url: string;
}
