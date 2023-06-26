import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-rich-textbox',
  templateUrl: './rich-textbox.component.html',
  styleUrls: ['./rich-textbox.component.scss'],
})
export class RichTextboxComponent implements OnInit, OnDestroy {
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
}
