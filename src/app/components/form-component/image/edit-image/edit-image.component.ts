import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageDto } from 'src/app/Model/image-dto';
import { FileService } from 'src/app/api/Common/file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
})
export class EditImageComponent implements OnInit {
  @Input() imageUrl?: string;
  @Input() imageName?: string;
  @Input() guid?: string;
  @Input() alt?: string;
  @Input() caption?: string;
  @Input() description?: string;
  @Input() uploadDate?: Date;
  formattedUploadDate: string | null = null;

  editForm!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private service: FileService,
    private datePipe: DatePipe // Inject the DatePipe module
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      imageUrl: [this.imageUrl],
      imageName: [this.imageName],
      alt: [this.alt],
      caption: [this.caption],
      description: [this.description],
      // Add other form controls for other image properties here if needed
    });
    this.formatUploadDate();
  }

  close(): void {
    this.bsModalRef.hide();
  }

  async onSubmit(): Promise<void> {
    let image: ImageDto = {
      name: this.editForm.controls['imageName'].value,
      url: this.editForm.controls['imageUrl'].value,
      description: this.editForm.controls['description'].value,
      caption: this.editForm.controls['caption'].value,
      alt: this.editForm.controls['alt'].value,
      file: null,
      guid: this.guid || '',
      uploadDate: this.uploadDate || new Date(),
    };
    await this.service.updateEditedImage(image);
    this.close();
  }
  formatUploadDate(): void {
    if (this.uploadDate) {
      // Format the uploadDate using the DatePipe
      this.formattedUploadDate = this.datePipe.transform(
        this.uploadDate,
        'dd-MM-yyyy hh:mm a'
      );
    }
  }
}
