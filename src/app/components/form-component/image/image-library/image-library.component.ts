import {
  Component,
  OnInit,
  Pipe,
  PipeTransform,
  ElementRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageDto } from 'src/app/Model/image-dto';
import { FileService } from 'src/app/api/Common/file.service';
import { CommonService } from 'src/app/api/Common/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; // Import BsModalService and BsModalRef
import { EditImageComponent } from '../edit-image/edit-image.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { image } from 'ngx-editor/schema/nodes';

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrls: ['./image-library.component.scss'],
})
export class ImageLibraryComponent implements OnInit {
  selectedFiles: File[] = [];
  uploadingImages: boolean = false;
  uploadProgress: number = 0;
  //images: { url: string; name: string; isHovered: boolean }[] = []; // Add a property to track hovering
  textFile?: string;
  tempImages: any;
  selectedImages: {
    url: string;
    name: string;

    isSelected: boolean;
    guid: string;
  }[] = [];
  images: {
    url: string;
    name: string;
    alt: string;
    caption: string;
    description: string;
    isHovered: boolean;
    isSelected: boolean;
    guid: string;
  }[] = [];
  canShow: boolean = true; // Property to control showing all images
  isFiltered: boolean = false; // Property to indicate if the images are filtered
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  searchText: string = ''; // Property to store the search text
  sortCriteria: string = ''; // Property to store the sort criteria

  constructor(
    private http: HttpClient,
    private fileService: FileService,
    private common: CommonService,
    private modalService: BsModalService, // Inject BsModalService
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  applyFilter(): void {
    const searchText = this.searchText.toLowerCase();
    this.images = this.tempImages;

    // Filter the images based on the search text
    this.images = this.images.filter((image) =>
      image.name.toLowerCase().includes(searchText)
    );
  }

  async removeImages() {
    console.log(this.selectedImages);
    const result: ImageDto[] = this.selectedImages.map((res) => ({
      name: res.name,
      url: res.url,
      guid: res.guid,
      alt: '',
      caption: '',
      description: '',
      file: null,
    }));

    try {
      await this.fileService.remove(result);
      this.loadImages(); // Refresh the image list after deleting
    } catch (error) {
      // Handle the error, if needed
      console.error('Error removing images', error);
    } finally {
      this.selectedImages = []; // Reset the selectedImages array
    }
  }

  applySort(): void {
    if (this.sortCriteria === 'date') {
      // Sort images by date in ascending order
      //  this.images.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortCriteria === 'name') {
      // Sort images by name in ascending order
      this.images.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Add other sort criteria here if needed
  }

  onMouseClick(image: {
    url: string;
    name: string;
    isHovered: boolean;
    guid: string;
    alt: string;
    caption: string;
    description: string;
  }): void {
    image.isHovered = true;

    // Open the EditImageComponent as a modal dialog
    const initialState = {
      imageUrl: image.url,
      imageName: image.name,
      alt: image.alt,
      caption: image.caption,
      description: image.description,
      guid: image.guid,
    };
    const modalOptions = {
      initialState,
      class: 'modal-lg',
      ignoreBackdropClick: true,
    };
    const bsModalRef: BsModalRef = this.modalService.show(
      EditImageComponent,
      modalOptions
    );

    // Subscribe to the onHide event to handle the result when the modal is closed
    bsModalRef.onHide?.subscribe((result) => {
      // Handle the result here if needed
      console.log('The dialog was closed', result);
      this.loadImages();
    });
  }

  ngOnInit(): void {
    this.loadImages();
  }

  onSelect(event: any): void {
    this.selectedFiles = event.target.files;
    this.loadImages();
  }

  async onUpload(): Promise<void> {
    if (this.selectedFiles.length === 0) {
      return;
    }
    this.spinner.show();

    for (const file of this.selectedFiles) {
      const newImage: ImageDto = {
        name: file.name,
        guid: this.common.newGuid(),
        alt: '',
        url: '',
        caption: '',
        description: '',
        file: file,
      };

      try {
        await this.uploadFile(newImage);
        this.toast.success('Upload successful!');
      } catch (error) {
        this.toast.error('Upload failed!');
      } finally {
        // Access the input element using the template reference variable
        const imageInput: HTMLInputElement | null =
          this.imageInput.nativeElement;
        console.log('imageinput', imageInput);
        if (imageInput) {
          imageInput.value = ''; // Reset the input value to an empty string
        }
      }
    }
    this.selectedFiles = [];
    this.loadImages();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  async uploadFile(image: ImageDto): Promise<void> {
    try {
      let formdata = new FormData();
      formdata.append(image.guid, image.file, image.name);

      await this.fileService.uploadFile(formdata);
    } catch (error) {
      this.toast.error('Upload failed!');
      throw error;
    }
  }

  loadImages(): void {
    this.fileService.getImages().subscribe({
      next: (response: ImageDto[]) => {
        // Update the response type to ImageDto[]
        console.log(response); // Log the response to the console to inspect the data

        this.images = response.map((imageInfo) => {
          // Access the URL and Name from the ImageDto object
          const imageUrl = imageInfo.url;
          const imageName = imageInfo.name;
          return {
            url: imageUrl,
            name: imageName,
            isHovered: false, // Initialize the isHovered property as false
            isSelected: false,
            guid: imageInfo.guid,
            caption: imageInfo.caption,
            description: imageInfo.description,
            alt: imageInfo.alt,
          };
        });

        this.tempImages = this.images;
      },
      error: (error) => {
        console.error('Error fetching images!', error);
      },
    });
  }

  onMouseEnter(image: { url: string; name: string; isHovered: boolean }): void {
    image.isHovered = true;
  }

  onMouseLeave(): void {
    // Reset the isHovered property for all images
    this.images.forEach((image) => {
      image.isHovered = false;
    });
  }

  getImageNameFromUrl(imageUrl: string): string {
    const lastIndex = imageUrl.lastIndexOf('/');
    const filename = imageUrl.substring(lastIndex + 1);
    const name = filename.split('.')[0]; // Get the name part without the file extension
    return name;
  }

  onImageSelect(
    event: Event,
    image: {
      url: string;
      name: string;
      isHovered: boolean;
      isSelected: boolean;
      guid: string;
    }
  ): void {
    if (!this.isFiltered) {
      event.stopPropagation(); // Prevent the image click event from triggering

      image.isSelected = !image.isSelected; // Toggle the selected state of the image

      // If the image is now selected, add it to the selectedImages array
      if (image.isSelected) {
        this.selectedImages.push({
          url: image.url,
          name: image.name,
          isSelected: true,
          guid: image.guid,
        });
      } else {
        // If the image is deselected, remove it from the selectedImages array
        this.selectedImages = this.selectedImages.filter(
          (selectedImage) => selectedImage.url !== image.url
        );
      }
    }
  }
}
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (!value || value.length <= maxLength) {
      return value;
    }

    return value.substr(0, maxLength) + '...';
  }
}
