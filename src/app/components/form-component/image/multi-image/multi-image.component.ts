import { Component, EventEmitter, Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageDto } from 'src/app/Model/image-dto';
import { CommonService } from 'src/app/api/Common/common.service';
import { FileService } from 'src/app/api/Common/file.service';

@Component({
  selector: 'app-multi-image',
  templateUrl: './multi-image.component.html',
  styleUrls: ['./multi-image.component.scss'],
})
export class MultiImageComponent {
  @Output() imagesSelected: EventEmitter<ImageDto[]> = new EventEmitter<
    ImageDto[]
  >();
  @Output() imagesRemoved: EventEmitter<void> = new EventEmitter<void>();

  defaultFrameHeight: number = 200; // Set your desired default height
  imageUrls: string[] = [];
  images: ImageDto[] = [];
  constructor(
    private common: CommonService,
    private fileService: FileService,
    private spinner: NgxSpinnerService
  ) {
    this.images = []; // Initialize the images property
  }
  async onFilesChange(event: Event): Promise<void> {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      const files = Array.from(inputElement.files);
      await this.processSelectedFiles(files);
      inputElement.value = '';
    }
    this.updateFrameClass();
  }

  async processSelectedFiles(files: File[]): Promise<void> {
    const newImages: ImageDto[] = [];

    for (const file of files) {
      const newImage: ImageDto = {
        url: '', // You can initialize this as empty, or construct a URL if needed
        name: file.name,
        alt: '',
        description: '',
        caption: '',
        guid: this.common.newGuid(),
        file: file,
        uploadDate: new Date(),
        width: 0,
        height: 0,
      };

      await this.readImageAsDataURL(file, newImage);
      newImages.push(newImage);
    }

    this.images = this.images.concat(newImages);
    this.imagesSelected.emit(this.images);

    // Save the images using the FileService
    await this.saveImages(newImages);
  }

  private async saveImages(images: ImageDto[]): Promise<void> {
    try {
      this.spinner.show();

      const formData = new FormData();
      for (const image of images) {
        let imageName = 'Product\\' + image.name;
        formData.append(image.guid, image.file, imageName);
      }

      // Call the uploadFile method from the FileService
      const uploadedImages = await this.fileService
        .uploadFile(formData)
        .toPromise();
      this.images = uploadedImages || []; // Assign the returned images to this.images

      // Display success message or perform additional actions if needed
      console.log('Images saved successfully');
    } catch (error) {
      console.error('Error saving images:', error);
      // Handle the error appropriately
    }
    this.spinner.hide();
  }

  private async readImageAsDataURL(file: File, image: ImageDto): Promise<void> {
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push(reader.result as string);
        resolve();
      };
      reader.readAsDataURL(file);
    });
  }

  private updateFrameClass() {
    const multiImageFrame = document.querySelector('.multi-image-frame');
    if (multiImageFrame) {
      multiImageFrame.classList.toggle('has-images', this.imageUrls.length > 0);
    }
  }

  removeImage(index: number): void {
    this.fileService.remove(this.images.splice(index, 1));
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
  private async processDroppedFiles(files: FileList): Promise<void> {
    const filesArray = Array.from(files);
    const newImages: ImageDto[] = []; // Temporary array to store converted images

    for (const file of filesArray) {
      const newImage: ImageDto = {
        url: '', // Initialize this as needed
        name: file.name,
        alt: '',
        description: '',
        caption: '',
        guid: this.common.newGuid(),
        file: file,
        uploadDate: new Date(),
        width: 0,
        height: 0,
      };

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push(reader.result as string);
      };
      reader.readAsDataURL(file);

      newImages.push(newImage);
    }

    this.images = this.images.concat(newImages);
    this.imagesSelected.emit(this.images);
    this.updateFrameClass();

    // Save the dropped images
    await this.saveImages(newImages);
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
    this.spinner.show();

    this.fileService.remove(this.images);
    this.imageUrls = [];
    this.images = [];
    this.imagesRemoved.emit();
    this.spinner.hide();
  }
}
