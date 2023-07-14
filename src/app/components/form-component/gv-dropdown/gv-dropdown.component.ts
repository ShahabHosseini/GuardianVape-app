import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-gv-dropdown',
  templateUrl: './gv-dropdown.component.html',
  styleUrls: ['./gv-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GvDropdownComponent),
      multi: true,
    },
  ],
})
export class GvDropdownComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Output() selectionChange = new EventEmitter<any>();
  @Input() search: boolean = false;
  @Input() disabled = false;
  value: any = null;
  hoveredRating = 2;
  isMouseOver = false;
  // Value accessor methods
  private onChange: any = () => {};
  private onTouch: any = () => {};

  writeValue(angularProvidedValue: any): void {
    // Update the value of the dropdown component
    this.value = angularProvidedValue;
  }

  registerOnChange(angularProvidedFunction: any): void {
    // Register the callback function to propagate changes
    this.onChange = angularProvidedFunction;
  }
  registerOnTouched(angularProvidedFunction: any) {
    this.onTouch = angularProvidedFunction;
  }
  setDisabledState(isDisabled: boolean): void {
    // Set the disabled state of the dropdown component
    // You can modify the implementation based on the requirements
  }

  onSelectionChange(event: any): void {
    // Emit the selectionChange event with the entire event object
    this.value = event;
    this.onChange(this.value);
  }

  // Other component logic and event handlers
}
