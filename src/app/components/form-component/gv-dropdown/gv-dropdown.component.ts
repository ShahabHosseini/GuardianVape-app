import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgxDropdownConfig } from 'ngx-select-dropdown';

@Component({
  selector: 'app-gv-dropdown',
  templateUrl: './gv-dropdown.component.html',
  styleUrls: ['./gv-dropdown.component.scss'],
})
export class GvDropdownComponent implements OnChanges {
  @Input() options: any[] = [];
  @Output() selectionChange = new EventEmitter<any>();
  @Input() search: boolean = false;

  config: NgxDropdownConfig = {
    displayKey: 'title',
    search: false, // Initial value, will be updated in ngOnChanges
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search']) {
      this.config.search = this.search;
    }
  }

  // Other component logic and event handlers
}
