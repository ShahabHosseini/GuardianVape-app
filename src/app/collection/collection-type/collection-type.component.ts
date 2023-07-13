import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    this.form = this.formBuilder.group({
      collectionType: ['automated'], // Default value for radio button selection
      conditionType: ['', Validators.required],
      conditions: this.formBuilder.array([]), // Empty form array for conditions
    });
  }

  ngOnInit() {
    this.addCondition();
  }

  isAutomated(): boolean {
    return this.form.get('collectionType')?.value === 'automated';
  }

  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  getConditionFormGroup(index: number): FormGroup {
    return this.conditions.at(index) as FormGroup;
  }

  addCondition(): void {
    if (this.conditions.length === 0) {
      const initialConditionFormGroup = this.formBuilder.group({
        conditionType: [null, Validators.required],
        equal: [null, Validators.required],
        result: [null],
        selectedItem: [],
      });
      this.conditions.push(initialConditionFormGroup);
    } else {
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
    if (this.conditions.length > 1) this.conditions.removeAt(index);
    else this.toast.error('Access control', 'You can`t remove last condition!');
  }

  public getData() {
    const conditions: ConditionDto[] = this.conditions.value.map(
      (condition: any) => {
        const conditionDto: ConditionDto = {
          conditionType: condition.conditionType,
          equal: condition.equal,
          result: condition.result,
        };
        return conditionDto;
      }
    );

    console.log('value is:', conditions);
  }
}
