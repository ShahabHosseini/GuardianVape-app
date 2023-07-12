import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../collection.service';
import { IdTitleDto } from 'src/app/Model/id-title-dto';
import { NgxDropdownConfig } from 'ngx-select-dropdown';
import { ConditionDto } from 'src/app/Model/conditionDto';
import { startWith, pairwise } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
})
export class ConditionComponent implements OnInit, AfterViewInit {
  @Input() conditionForm: FormGroup;
  @Input() index!: number;
  @Output() removeCondition = new EventEmitter<number>();
  selectedConditionType: any = null;

  conditionTypes: SelectItem[] = [];
  equals: SelectItem[] = [];
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
      conditionType: [null, Validators.required],
      equal: [null, Validators.required],
      result: [null, Validators.required],
      selectedItem: [],
    });
  }
  ngAfterViewInit(): void {
    this.conditionForm
      .get('conditionType')
      ?.valueChanges.pipe(startWith(null), pairwise())
      .subscribe(([prev]: [any, any]) => {
        console.log('x barabar ast ba:', prev);
        this.updateSelectedItem('');
      });

    this.conditionForm
      .get('equal')
      ?.valueChanges.pipe(startWith(null))
      .subscribe(() => {
        this.updateSelectedItem('');
      });

    this.conditionForm
      .get('result')
      ?.valueChanges.pipe(pairwise())
      .subscribe(([prev]: [any, any]) => {
        console.log('x barabar ast ba:', prev);
        this.updateSelectedItem('');
      });
  }

  ngOnInit() {
    this.service.getAllConditionType().subscribe((res: IdTitleDto[]) => {
      this.conditionTypes = res.map((item) => ({
        label: item.title,
        value: item,
      }));
    });

    this.equals = ['Equal 1', 'Equal 2', 'Equal 3'].map((item) => ({
      label: item,
      value: item,
    }));
    this.results = ['Result 1', 'Result 2', 'Result 3']; // Sample results options

    this.conditionForm.get('conditionType')?.valueChanges.subscribe((value) => {
      this.selectedConditionType = value; // Update the selectedConditionType variable
    });
  }
  onRemoveCondition(): void {
    this.removeCondition.emit(this.index);
  }

  updateSelectedItem(event: any) {
    console.log(event);
    const conditionType = this.conditionForm.get('conditionType')?.value;
    const equal = this.conditionForm.get('equal')?.value;
    const result = this.conditionForm.get('result')?.value;

    // Create the selected item object
    const selectedItem: ConditionDto = {
      conditionType: conditionType,
      equal: equal,
      result: result,
    };
    console.log('lkasjlkdjalksdja ', selectedItem.conditionType);
    this.conditionForm.patchValue({
      selectedItem: selectedItem,
    });
  }
  onConditionTypeSelectionChange(event: any) {
    this.selectedConditionType = event.value;
    console.log('metod 1 ', this.selectedConditionType);
  }

  getConditionTypeValue(): string {
    return this.selectedConditionType?.title ?? '';
  }
}
