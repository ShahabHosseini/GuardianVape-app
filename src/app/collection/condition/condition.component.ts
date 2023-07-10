import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../collection.service';
import { IdTitleDto } from 'src/app/Model/id-title-dto';
import { NgxDropdownConfig } from 'ngx-select-dropdown';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
})
export class ConditionComponent implements OnInit {
  @Input() conditionForm: FormGroup;
  @Input() index!: number;
  @Output() removeCondition = new EventEmitter<number>();

  conditionTypes: IdTitleDto[] = [];
  equals: string[] = [];
  results: string[] = [];

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

  constructor(
    private formBuilder: FormBuilder,
    private service: CollectionService
  ) {
    this.conditionForm = this.formBuilder.group({
      conditionType: ['', Validators.required],
      equal: ['', Validators.required],
      result: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.service.getAllConditionType().subscribe((res: IdTitleDto[]) => {
      this.conditionTypes = res;
    });

    this.equals = ['Equal 1', 'Equal 2', 'Equal 3']; // Sample equals options
    this.results = ['Result 1', 'Result 2', 'Result 3']; // Sample results options
  }

  onRemoveCondition(): void {
    this.removeCondition.emit(this.index);
  }
}
