import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  HostBinding,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CollectionTypeDto } from 'src/app/Model/collection-type-dto';
import { ConditionDto } from 'src/app/Model/conditionDto';
import { CommonService } from 'src/app/api/Common/common.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-collection-type',
  templateUrl: './collection-type.component.html',
  styleUrls: ['./collection-type.component.scss'],
  animations: [
    trigger('flyIn', [
      // state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(200),
      ]),
    ]),
    trigger('flyOut', [
      transition('* => void', [
        animate(200, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class CollectionTypeComponent implements OnInit {
  @Input()
  parentForm!: FormGroup;
  form: FormGroup;
  guid: string = '';
  isAdd = false;
  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private commonService: CommonService
  ) {
    // Initialize the form with default values
    this.form = this.formBuilder.group({
      collectionType: ['automated'], // Default value for radio button selection
      conditionType: ['all', Validators.required],
      conditions: this.formBuilder.array([]), // Empty form array for conditions
    });
  }

  ngOnInit() {
    this.addCondition();
  }
  newMethod(event: any) {
    console.log(event);
  }
  setData(collectionType: CollectionTypeDto) {
    // Set the form values based on the given CollectionTypeDto object
    this.form.patchValue({
      // collectionType: collectionType.collectionType,
      // conditionType: collectionType.conditionType,
    });

    // Clear existing conditions
    this.conditions.clear();

    console.log('collectionType', collectionType);
    // Add new conditions based on the data in the CollectionTypeDto
    if (collectionType.conditions && collectionType.conditions.length > 0) {
      collectionType.conditions.forEach((condition: ConditionDto) => {
        const conditionFormGroup = this.formBuilder.group({
          conditionType: [condition.conditionType, Validators.required],
          equal: [condition.equalType, Validators.required],
          result: [condition.result],
          selectedItem: condition as ConditionDto, // You don't need to set selectedItem here
          guid: [condition.guid],
        });
        conditionFormGroup
          .get('conditionType')
          ?.setValue(condition.conditionType);
        conditionFormGroup.get('equal')?.setValue(condition.equalType);

        conditionFormGroup.patchValue({
          selectedItem: condition,
        });
        this.conditions.push(conditionFormGroup);
      });
    } else {
      // If there are no conditions, add an initial condition form group
      const initialConditionFormGroup = this.formBuilder.group({
        conditionType: [null, Validators.required],
        equal: [null, Validators.required],
        result: [null],
        selectedItem: null,
        guid: [],
      });
      this.conditions.push(initialConditionFormGroup);
    }
    this.guid = collectionType.guid;
    console.log('my conditions here is :', this.conditions);
  }

  isAutomated(): boolean {
    // Check if the collection type is automated
    return this.form.get('collectionType')?.value === 'automated';
  }

  get conditions(): FormArray {
    // Get the form array of conditions
    return this.form.get('conditions') as FormArray;
  }

  getConditionFormGroup(index: number): FormGroup {
    // Get the form group of a specific condition at the given index
    return this.conditions.at(index) as FormGroup;
  }

  addCondition(): void {
    // Add a new condition to the form array
    if (this.conditions.length === 0) {
      // If there are no existing conditions, add an initial condition form group
      const initialConditionFormGroup = this.formBuilder.group({
        conditionType: [null, Validators.required],
        equal: [null, Validators.required],
        result: [null],
        selectedItem: [],
        guid: [this.commonService.newGuid()],
      });
      this.conditions.push(initialConditionFormGroup);
    } else {
      // If there are existing conditions, add a new condition form group
      const conditionFormGroup = this.formBuilder.group({
        conditionType: [null, Validators.required],
        equal: [null, Validators.required],
        result: [null],
        selectedItem: [],
        guid: [this.commonService.newGuid()],
      });
      this.conditions.push(conditionFormGroup);
    }
    this.isAdd = true;
  }
  resetR() {
    this.conditions.clear();
    const conditionFormGroup = this.formBuilder.group({
      conditionType: [null, Validators.required],
      equal: [null, Validators.required],
      result: [null],
      selectedItem: [],
      guid: [],
    });
    this.conditions.push(conditionFormGroup);
    this.form.get('collectionType')?.setValue('automated');
    this.form.get('conditionType')?.setValue('all');
  }

  removeCondition(index: number): void {
    // Remove a condition from the form array
    if (this.conditions.length > 1) {
      // If there are more than one conditions, remove the condition at the given index
      this.conditions.removeAt(index);
    } else {
      // If there is only one condition, show an error message
      this.toast.error('Access control', 'You can`t remove last condition!');
    }
    this.isAdd = false;
  }

  public getData(): CollectionTypeDto {
    console.log(this.conditions.value);
    // Get the data from the form and return it as a CollectionTypeDto object
    const conditions: ConditionDto[] = this.conditions.value.map(
      (condition: any) => {
        const conditionDto: ConditionDto = {
          conditionType: condition.conditionType, // Extract the value of the condition type
          equalType: condition.equal,
          result: condition.result,
          guid: condition.guid || '',
        };
        return conditionDto;
      }
    );

    const conditionType = this.form.get('conditionType')?.value;
    const collectionType = this.form.get('collectionType')?.value;

    const selectedItem: CollectionTypeDto = {
      conditions: conditions,
      guid: this.guid,
      // collectionType: collectionType,
      // conditionType: conditionType,
    };

    return selectedItem;
  }
}
