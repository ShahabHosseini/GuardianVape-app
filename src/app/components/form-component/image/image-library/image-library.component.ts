import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageDto } from 'src/app/Model/image-dto';
import { FileService } from 'src/app/api/Common/file.service';
import { CommonService } from 'src/app/api/Common/common.service';

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrls: ['./image-library.component.scss'],
})
export class ImageLibraryComponent implements OnInit {
  selectedFiles: File[] = [];
  images: { url: string; name: string; isHovered: boolean }[] = []; // Add a property to track hovering
  textFile?: string;

  constructor(
    private http: HttpClient,
    private fileService: FileService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  onSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }

  async onUpload(): Promise<void> {
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
        console.log(newImage);
        await this.uploadFile(newImage);
        console.log('Upload successful!');
      } catch (error) {
        console.error('Upload failed!', error);
      }
    }
    this.selectedFiles = [];
    this.loadImages();
  }

  async uploadFile(image: ImageDto): Promise<void> {
    try {
      let formdata = new FormData();
      formdata.append(image.guid, image.file, image.name);

      await this.fileService.uploadFile(formdata);
    } catch (error) {
      console.error('Upload failed!', error);
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
          };
        });

        console.log(this.images); // Check the updated image data in the browser console
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
}
