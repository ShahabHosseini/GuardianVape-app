import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
})
export class ConditionComponent implements OnInit {
  @Input() conditionForm!: FormGroup;
  @Input() index!: number;
  @Output() removeCondition = new EventEmitter<number>();

  productTags!: string[];
  productTag!: string;

  constructor(private formBuilder: FormBuilder) {
    this.productTags = []; // Initialize productTags with your data
    this.productTag = ''; // Initialize productTag as needed
  }
  ngOnInit() {}
  onProductTagChange(event: any) {
    // Handle product tag change logic if required
  }

  onRemoveCondition(): void {
    this.removeCondition.emit(this.index);
  }
}
