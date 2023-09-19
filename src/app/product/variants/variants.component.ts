import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {
  variantForm: FormGroup;
  private draggedVariantIndex: number | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.variantForm = this.formBuilder.group({
      region: [null, Validators.required],
      variantItems: this.formBuilder.array([]),
    });
  }

  get variantItems(): FormArray {
    return this.variantForm.get('variantItems') as FormArray;
  }

  ngOnInit() {}

  addVariantItem(): void {
    if (this.variantItems.length === 0) {
      const initialConditionFormGroup = this.formBuilder.group({
        optionName: [null, Validators.required],
        optionValues: [null, Validators.required],
      });
      this.variantItems.push(initialConditionFormGroup);
    } else {
      const conditionFormGroup = this.formBuilder.group({
        optionName: [null, Validators.required],
        optionValues: [null, Validators.required],
      });
      this.variantItems.push(conditionFormGroup);
    }
  }

  getItemFormGroup(index: number): FormGroup {
    // Get the form group of a specific condition at the given index
    return this.variantItems.at(index) as FormGroup;
  }

  removeItem(index: number): void {
    this.variantItems.removeAt(index);
  }

  onDragStartVariant(event: DragEvent, index: number) {
    // Store the index of the dragged item.
    this.draggedVariantIndex = index;
  }

  onDragEndVariant(event: DragEvent) {
    // Reset the dragged item index.
    this.draggedVariantIndex = null;
  }

  onDragOverVariant(event: DragEvent) {
    event.preventDefault();
  }

  onDropVariant(event: DragEvent, targetIndex: number) {
    event.preventDefault();
    if (this.draggedVariantIndex !== null) {
      // Reorder the variants array based on the drag-and-drop
      const variant = this.variantItems.at(this.draggedVariantIndex);
      this.variantItems.removeAt(this.draggedVariantIndex);
      this.variantItems.insert(targetIndex, variant);

      this.draggedVariantIndex = null; // Reset the dragged variant index
    }
  }
}
