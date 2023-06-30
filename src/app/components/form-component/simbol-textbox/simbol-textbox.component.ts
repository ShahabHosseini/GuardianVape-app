import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simbol-textbox',
  templateUrl: './simbol-textbox.component.html',
  styleUrls: ['./simbol-textbox.component.scss'],
})
export class SimbolTextboxComponent {
  @Input() simbol: string = '';
}
