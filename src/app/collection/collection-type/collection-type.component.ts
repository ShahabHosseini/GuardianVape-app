import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CollectionTypeDto } from 'src/app/Model/collection-type-dto';
import { ConditionDto } from 'src/app/Model/conditionDto';

@Component({
  selector: 'app-collection-type',
  templateUrl: './collection-type.component.html',
  styleUrls: ['./collection-type.component.scss'],
})
export class CollectionTypeComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private toast: ToastrService) {
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
      });
      this.conditions.push(initialConditionFormGroup);
    } else {
      // If there are existing conditions, add a new condition form group
      const conditionFormGroup = this.formBuilder.group({
        conditionType: [null, Validators.required],
        equal: [null, Validators.required],
        result: [null],
        selectedItem: [],
      });
      this.conditions.push(conditionFormGroup);
    }
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
  }

  public getData(): CollectionTypeDto {
    // Get the data from the form and return it as a CollectionTypeDto object
    const conditions: ConditionDto[] = this.conditions.value.map(
      (condition: any) => {
        const conditionDto: ConditionDto = {
          conditionType: condition.conditionType.value, // Extract the value of the condition type
          equalType: condition.equalType,
          result: condition.result,
        };
        return conditionDto;
      }
    );

    const conditionType = this.form.get('conditionType')?.value;
    const collectionType = this.form.get('collectionType')?.value;

    const selectedItem: CollectionTypeDto = {
      conditions: conditions,
      // collectionType: collectionType,
      // conditionType: conditionType,
    };

    return selectedItem;
  }
}
