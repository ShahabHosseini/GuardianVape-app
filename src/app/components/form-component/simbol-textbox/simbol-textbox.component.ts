import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-simbol-textbox',
  templateUrl: './simbol-textbox.component.html',
  styleUrls: ['./simbol-textbox.component.scss'],
})
export class SimbolTextboxComponent {
  @Input() simbol: string = '';
  @Input() formControl: FormControl | null = null;

  getFormControl(): FormControl {
    if (this.formControl instanceof FormControl) {
      return this.formControl;
    } else {
      throw new Error('Invalid form control');
    }
  }
}
