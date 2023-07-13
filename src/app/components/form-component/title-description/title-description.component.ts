import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RichTextboxComponent } from '../rich-textbox/rich-textbox.component';
import { TitleDescriptionDto } from 'src/app/Model/title-description-dto';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-title-description',
  templateUrl: './title-description.component.html',
  styleUrls: ['./title-description.component.scss'],
})
export class TitleDescriptionComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() parentForm!: FormGroup;
  @Output() formDataChanged: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  @ViewChild('richTextbox') richTextbox!: RichTextboxComponent;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    this.parentForm.addControl('titleDescription', this.form);
    this.form.valueChanges.subscribe((formData: any) => {
      this.formDataChanged.emit(formData);
    });
  }
  ngAfterViewInit() {
    if (this.richTextbox && this.richTextbox.form) {
      this.richTextbox.form.valueChanges.subscribe((formData: any) => {
        this.formDataChanged.emit(formData);
      });
    }
  }

  // Example function to access the description value
  getData(): TitleDescriptionDto {
    let data: TitleDescriptionDto = new TitleDescriptionDto();
    if (this.richTextbox && this.richTextbox.form) {
      data.description =
        this.richTextbox.form.get('editorContent')?.value || '';
    }
    data.title = this.form.get('title')?.value || '';
    return data;
  }
}
