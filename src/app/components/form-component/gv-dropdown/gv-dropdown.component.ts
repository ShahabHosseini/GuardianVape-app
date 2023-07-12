import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgxDropdownConfig } from 'ngx-select-dropdown';

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

  config: NgxDropdownConfig = {
    displayKey: 'title',
    search: false,
    height: 'auto',
    placeholder: 'Select',
    customComparator: (option1: any, option2: any): any => {
      // Implement your custom comparison logic here
      // Return a number indicating the comparison result
      // Example: return option1.id - option2.id;
    },
    limitTo: 0,
    moreText: 'More',
    noResultsFound: 'No results found',
    searchPlaceholder: 'Search',
    searchOnKey: '',
    clearOnSelection: false,
    inputDirection: 'ltr',
    // Add other required properties here
  };

  // Value accessor methods
  private onChange: any = () => {};
  private onTouch: any = () => {};

  writeValue(value: any): void {
    // Update the value of the dropdown component
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    // Register the callback function to propagate changes
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Register the callback function for touch events
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Set the disabled state of the dropdown component
    // this.config.disabled = isDisabled;
  }

  onSelectionChange(event: any): void {
    // Emit the selectionChange event with the selected value
    this.selectionChange.emit(event);
  }

  // Other component logic and event handlers
}
