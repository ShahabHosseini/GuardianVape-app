import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { forwardRef } from '@angular/core';

@Component({
  selector: 'app-rich-textbox',
  templateUrl: './rich-textbox.component.html',
  styleUrls: ['./rich-textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextboxComponent),
      multi: true,
    },
  ],
})
export class RichTextboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  editor!: Editor;
  form: FormGroup;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      editorContent: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor.commands.focus().exec();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // ControlValueAccessor implementation
  writeValue(obj: any): void {
    // Implement this function to set the value of the editor
    if (obj !== undefined) {
      this.form.get('editorContent')?.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    // Implement this function to notify the form about value changes
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // Implement this function to register the touch event
    this.form.get('editorContent')?.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this function to enable/disable the editor based on the disabled state
    if (isDisabled) {
      this.form.get('editorContent')?.disable();
    } else {
      this.form.get('editorContent')?.enable();
    }
  }
}
