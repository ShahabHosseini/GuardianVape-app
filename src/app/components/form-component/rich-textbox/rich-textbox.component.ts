import { AfterViewInit, Component } from '@angular/core';
import { ContentEditableDirective } from '../../helper/content-editable.directive';
import { ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rich-textbox',
  templateUrl: './rich-textbox.component.html',
  styleUrls: ['./rich-textbox.component.scss'],
})
export class RichTextboxComponent {
  @ViewChild('editor') editor!: ContentEditableDirective;
  public editorCopy = '';
  public content!: string;
  public editorContent!: string;

  constructor() {}

  handleCommand(role: string): void {
    switch (role) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'p':
        this.editor.formatBlock(role);
        break;
      default:
        this.editor.executeCommand(role);
        break;
    }
    this.editorCopy = this.editor.getContent();
  }

  handleKeyUp(): void {
    this.editorCopy = this.editor.getContent();
  }

  handleCheckIt(): void {
    alert(this.editorCopy);
  }
  handleEditorInput(event: Event): void {
    const target = event.target as HTMLDivElement;
    this.content = target.innerHTML;
  }
}
