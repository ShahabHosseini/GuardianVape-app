import { Component, Input, ElementRef, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-variantItem',
  templateUrl: './variantitem.component.html',
  styleUrls: ['./variantitem.component.scss']
})
export class VariantItemComponent {
  @Input() variantItemForm!: FormGroup;
  private draggedIndex: number | null = null;
  suggestedOptionNames: string[] = ['Color', 'Size', 'Style', 'Material'];
  datalistOptions: string[] = [];
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();

  //variantItemForm: FormGroup;

  private typingTimer: any;
  private doneTypingInterval = 400; // 400 milliseconds

  constructor(
        private formBuilder: FormBuilder,
    private renderer: Renderer2 // Inject Renderer2
  ) {
    this.variantItemForm = this.formBuilder.group({
      optionName: [null, Validators.required],
      optionValues: this.formBuilder.array([]),
    });
    this.addOptionValue();
  }

  addOptionValue() {
    const optionValuesArray = this.variantItemForm.get('optionValues') as FormArray;
    const lastOptionValueIndex = optionValuesArray.length - 1;

    if (lastOptionValueIndex >= 0) {
      const lastOptionValue = optionValuesArray.at(lastOptionValueIndex);
      if (!lastOptionValue.get('value')?.value.trim()) {
        return;
      }
    }

    optionValuesArray.push(
      this.formBuilder.group({
        value: '',
      })
    );

  }

  removeOptionValue(index: number) {
   // if (index <= 0) return;
    const optionValuesArray = this.variantItemForm.get('optionValues') as FormArray;
   if(optionValuesArray.length<1) return
    optionValuesArray.removeAt(index);
  }

  onOptionValueInput() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.addOptionValue();
    }, this.doneTypingInterval);
  }

  getOptionValuesControls() {
    return (this.variantItemForm.get('optionValues') as FormArray).controls;
  }
  onDragStart(event: DragEvent, index: number) {
    // Store the index of the dragged item.
    this.draggedIndex = index;
  }

  onDragEnd(event: DragEvent) {
    // Reset the dragged item index.
    this.draggedIndex = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetIndex: number) {
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const optionValuesArray = this.variantItemForm.get('optionValues') as FormArray;
      const optionValue = optionValuesArray.at(this.draggedIndex);
      optionValuesArray.removeAt(this.draggedIndex);
      optionValuesArray.insert(targetIndex, optionValue);
      this.draggedIndex = null; // Reset the dragged item index.
    }
  }

  onOptionNameInput(event: Event) {
    // Clear the datalist options
    this.datalistOptions = [];

    // Filter and add new datalist options based on user input
    this.suggestedOptionNames.forEach((suggestion) => {
      const option = document.createElement('option');
      option.value = suggestion;
      this.datalistOptions.push(suggestion);
    });
  }
  removeItem() {
    // Emit the remove event when the "Remove" button is clicked
    this.remove.emit();
  }

}
