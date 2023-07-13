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
      .subscribe(() => {
        this.updateSelectedItem();
      });

    this.conditionForm
      .get('equal')
      ?.valueChanges.pipe(startWith(null))
      .subscribe(() => {
        this.updateSelectedItem();
      });

    this.conditionForm
      .get('result')
      ?.valueChanges.pipe(pairwise())
      .subscribe(([prev]: [any, any]) => {
        console.log('x barabar ast ba:', prev);
        this.updateSelectedItem();
      });
  }

  ngOnInit() {
    this.service.getAllConditionType().subscribe((res: IdTitleDto[]) => {
      this.conditionTypes = res.map((item) => ({
        label: item.title,
        value: item,
      }));
    });

    this.equals = [
      'contains',
      'is equal to',
      'is not equal to',
      'start with',
      'end with',
      'does not contain',
      'is greater than',
      'is less than',
    ].map((item) => ({
      label: item,
      value: item,
    }));
    this.results = ['Result 1', 'Result 2', 'Result 3']; // Sample results options

    // this.conditionForm.get('conditionType')?.valueChanges.subscribe((value) => {
    //   this.selectedConditionType = value; // Update the selectedConditionType variable
    // });
  }
  onRemoveCondition(): void {
    this.removeCondition.emit(this.index);
  }

  updateSelectedItem() {
    const conditionType = this.conditionForm.get('conditionType')?.value;
    const equal = this.conditionForm.get('equal')?.value;
    const result = this.conditionForm.get('result')?.value;

    // Create the selected item object
    const selectedItem: ConditionDto = {
      conditionType: conditionType,
      equal: equal,
      result: result,
    };
    console.log('updateSelectedItem ', conditionType);
    this.conditionForm.patchValue({
      selectedItem: selectedItem,
    });
  }
  onConditionTypeSelectionChange(event: any) {
    setTimeout(() => {
      this.selectedConditionType = event.value;
    }, 0);
    console.log('metod 1 ', this.selectedConditionType);
  }
  public getData(): ConditionDto {
    const conditionType = this.conditionForm.get('conditionType')?.value;
    const equal = this.conditionForm.get('equal')?.value;
    const result = this.conditionForm.get('result')?.value;
    const selectedItem: ConditionDto = {
      conditionType: conditionType,
      equal: equal,
      result: result,
    };
    return conditionType;
  }
}
