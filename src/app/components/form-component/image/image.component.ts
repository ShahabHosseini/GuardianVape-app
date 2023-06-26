import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Output() imageSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() imageRemoved: EventEmitter<void> = new EventEmitter<void>();

  imageForm: FormGroup;
  imageUrl: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.imageForm = this.formBuilder.group({
      imageFile: [''],
    });
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0];
      this.displayImage(file);

      // Emit the selected image to the parent component
      this.imageSelected.emit(file);

      // Create a new instance of FormGroup
      const newForm = this.formBuilder.group({
        imageFile: [file],
      });

      // Replace the existing form group
      this.imageForm = newForm;
    }
  }

  displayImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.imageUrl = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    // Clear the image URL and emit the remove event to the parent component
    this.imageUrl = null;
    this.imageRemoved.emit();
  }
}
