import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageDto } from 'src/app/Model/image-dto';
import { FileService } from 'src/app/api/Common/file.service';

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

  editForm!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private service: FileService
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
  }

  close(): void {
    this.bsModalRef.hide();
  }

  async onSubmit(): Promise<void> {
    const formData = this.editForm.value;
    console.log('Form data submitted:', formData);
    // Handle form submission logic here (e.g., update the image properties)
    let image: ImageDto = {
      name: this.editForm.controls['imageName'].value,
      url: this.editForm.controls['imageUrl'].value,
      description: this.editForm.controls['description'].value,
      caption: this.editForm.controls['caption'].value,
      alt: this.editForm.controls['alt'].value,
      file: null,
      guid: this.guid || '',
    };
    await this.service.updateEditedImage(image);
    this.close();
  }
}
