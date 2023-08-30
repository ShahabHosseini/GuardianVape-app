import { Component, EventEmitter, Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-multi-image',
  templateUrl: './multi-image.component.html',
  styleUrls: ['./multi-image.component.scss'],
})
export class MultiImageComponent {
  @Output() imagesSelected: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() imagesRemoved: EventEmitter<void> = new EventEmitter<void>();

  defaultFrameHeight: number = 200; // Set your desired default height
  imageUrls: string[] = [];
  images: File[] = [];

  onFilesChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      const files = Array.from(inputElement.files);
      this.images = this.images.concat(files);

      for (const file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrls.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      this.imagesSelected.emit(this.images);
      inputElement.value = ''; // Clear the input
    }
    if (this.imageUrls.length > 0) {
      document.querySelector('.multi-image-frame')?.classList.add('has-images');
    } else {
      document
        .querySelector('.multi-image-frame')
        ?.classList.remove('has-images');
    }
  }

  removeImage(index: number): void {
    this.imageUrls.splice(index, 1);
    this.images.splice(index, 1);
    this.imagesRemoved.emit();
    if (this.imageUrls.length > 0) {
      document.querySelector('.multi-image-frame')?.classList.add('has-images');
    } else {
      document
        .querySelector('.multi-image-frame')
        ?.classList.remove('has-images');
    }
  }

  showInputFile(event: Event): void {
    event.preventDefault(); // Prevent the default link behavior
    const fileInput = document.getElementById(
      'multiImageFile'
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.processDroppedFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  onFrameDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.processDroppedFiles(files);
    }
  }

  onFrameDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  private processDroppedFiles(files: FileList): void {
    const filesArray = Array.from(files);
    this.images = this.images.concat(filesArray);

    for (const file of filesArray) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    this.imagesSelected.emit(this.images);
  }
  getFrameHeight(): number {
    // Calculate the height based on the number of images
    const numRows = Math.ceil((this.imageUrls.length + 1) / 4); // Assuming 4 images per row
    return Math.max(numRows * 200, this.defaultFrameHeight);
  }
  calculateFrameHeight(): string {
    const numRows = Math.ceil((this.imageUrls.length + 1) / 4); // Assuming 4 images per row
    const calculatedHeight = Math.max(numRows * 200, this.defaultFrameHeight);
    return `${calculatedHeight}px`;
  }

  removeAllImages(): void {
    this.imageUrls = [];
    this.images = [];
    this.imagesRemoved.emit();
  }
}
