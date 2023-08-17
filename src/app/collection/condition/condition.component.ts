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
  selectedEqualType: any = null;
  isRemoving = false;

  conditionTypes: SelectItem[] = [];
  equals: SelectItem[] = [];
  results: string[] = [];
  guid: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private service: CollectionService
  ) {
    this.conditionForm = this.formBuilder.group({
      conditionType: [null, Validators.required],
      equal: [null, Validators.required],
      result: [null, Validators.required],
      selectedItem: [],
      guid: [],
    });
  }
  ngAfterViewInit(): void {
    this.service.getAllConditionType().subscribe((res: IdTitleDto[]) => {
      this.conditionTypes = res.map((item) => ({
        label: item.title,
        value: item,
      }));
    });
    this.service.getAllEqualType().subscribe((res: IdTitleDto[]) => {
      this.equals = res.map((item) => ({
        label: item.title,
        value: item,
      }));
    });

    this.conditionForm
      .get('conditionType')
      ?.valueChanges.pipe(pairwise())
      .subscribe(() => {
        this.updateSelectedItem();
      });

    this.conditionForm
      .get('equal')
      ?.valueChanges.pipe(pairwise())
      .subscribe(() => {
        this.updateSelectedItem();
      });

    this.conditionForm
      .get('result')
      ?.valueChanges.pipe(pairwise())
      .subscribe(() => {
        this.updateSelectedItem();
      });
  }

  ngOnInit() {
    this.updateSelectedItem();
    console.log('index:  ', this.index);
    // this.conditionForm.get('conditionType')?.valueChanges.subscribe((value) => {
    //   this.selectedConditionType = value; // Update the selectedConditionType variable
    // });
  }
  onRemoveCondition(): void {
    this.isRemoving = true;

    setTimeout(() => {
      this.removeCondition.emit(this.index);
    }, 10); // Assuming 500ms is the duration of your "flyOut" animation
  }

  updateSelectedItem() {
    const conditionType = this.conditionForm.get('conditionType')?.value;
    const equal = this.conditionForm.get('equal')?.value;
    const result = this.conditionForm.get('result')?.value;

    // Create the selected item object
    const selectedItem: ConditionDto = {
      conditionType: conditionType,
      equalType: equal,
      result: result,
      guid: this.guid,
    };
    console.log('updateSelectedItem ', equal);
    this.conditionForm.patchValue({
      selectedItem: selectedItem,
    });
  }
  onConditionTypeSelectionChange(event: any) {
    this.updateSelectedItem();
  }
  onEqualTypeSelectionChange(event: any) {
    this.updateSelectedItem();
  }

  // Change CollectionTypeDto to ConditionDto
  public getData(): ConditionDto {
    const conditionType = this.conditionForm.get('conditionType')?.value;
    const equal = this.conditionForm.get('equal')?.value;
    const result = this.conditionForm.get('result')?.value;
    const selectedItem: ConditionDto = {
      conditionType: conditionType,
      equalType: equal,
      result: result,
      guid: this.guid,
    };
    console.log('condition : ', selectedItem);
    return selectedItem;
  }
}
