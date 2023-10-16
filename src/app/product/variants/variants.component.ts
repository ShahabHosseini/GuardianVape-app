import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import {  ColDef,  ValueFormatterParams, ValueParserParams } from 'ag-grid-community';
import { ColGroupDef } from 'ag-grid-community';
import { TableVariantItemDto } from 'src/app/Model/variant-item';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @Input() parentForm!: FormGroup;
  variantForm: FormGroup;
  variantItemForm: FormGroup; // Initialize the form here

  private draggedVariantIndex: number | null = null;
  variantList: TableVariantItemDto[] = [];
  editingRowIndex: { [s: string]: TableVariantItemDto } = {};
  public editType: 'fullRow' = 'fullRow';

  constructor(private formBuilder: FormBuilder) {
    this.variantForm = this.formBuilder.group({
      variantItems: this.formBuilder.array([]),

    });
    this.variantItemForm = this.formBuilder.group({
      optionName: [null, Validators.required],
      optionValues: this.formBuilder.array([]),
    });

  }

  defaultColDef = {
    editable: true,
    resizable: true,
  };

  columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Variant', field: 'variant',type: 'nonEditableColumn',editable: false  },
    {
      headerName: 'Price',
      field: 'price',
      valueFormatter: this.currencyFormatter,
      valueParser: this.currencyParser,
    },
    { headerName: 'Available', field: 'available' },
    { headerName: 'OnHand', field: 'onHand',type: 'numericColumn'  },
    { headerName: 'Sku', field: 'sku' },
    { headerName: 'Barcode', field: 'barcode' },
  ];
  onCellValueChanged(event:any) {
    // Handle cell value changes here, you can update your data accordingly
    // event.data contains the row data
    // event.colDef.field contains the field name
    // event.newValue contains the new cell value
  }

  get variantItemFormArray(): FormArray {
    return this.variantForm.get('variantItems') as FormArray;
  }

  ngOnInit() {
   // this.fetchVariantData();
  }

  private async fetchVariantData() {
    const initialVariant: TableVariantItemDto = {
     // id: '1',
      variant: 'AA',
      price: 0,
      available: 0,
      onHand: 0,
      sku: '',
      barcode: '',
    };
  }


  addVariantItem(): void {
    if (this.variantItemFormArray.length === 0) {
      this.variantItemForm = this.formBuilder.group({
        optionName: ['', Validators.required],
        optionValues: [[], Validators.required],
      });
      this.variantItemFormArray.push(this.variantItemForm);
    } else {
      this.variantItemForm = this.formBuilder.group({
        optionName: ['', Validators.required],
        optionValues: [[], Validators.required],
      });
      this.variantItemFormArray.push(this.variantItemForm);
    }
  }

  getItemFormGroup(index: number): FormGroup {
    return this.variantItemFormArray.at(index) as FormGroup;
  }

  removeItem(index: number): void {
    this.variantItemFormArray.removeAt(index);
  }

  onDragStartVariant(event: DragEvent, index: number) {
    this.draggedVariantIndex = index;
  }

  onDragEndVariant(event: DragEvent) {
    this.draggedVariantIndex = null;
  }

  onDragOverVariant(event: DragEvent) {
    event.preventDefault();
  }

  onDropVariant(event: DragEvent, targetIndex: number) {
    event.preventDefault();
    if (this.draggedVariantIndex !== null) {
      const variant = this.variantItemFormArray.at(this.draggedVariantIndex);
      this.variantItemFormArray.removeAt(this.draggedVariantIndex);
      this.variantItemFormArray.insert(targetIndex, variant);

      this.draggedVariantIndex = null;
    }
  }

   currencyFormatter(params: ValueFormatterParams) {
    return '£' + (params.value !== null ? params.value.toFixed(2) : '');
  }

   currencyParser(params: ValueParserParams) {
    let value = params.newValue;
    if (value == null || value === '') {
      return null;
    }
    value = String(value);
    if (value.startsWith('£')) {
      value = value.slice(1);
    }
    return parseFloat(value);
  }
  onSubmit(index:number){
    const itemFormGroup = this.getItemFormGroup(index);
    const optionName = itemFormGroup.get('optionName')?.value;
    const optionValues = itemFormGroup.get('optionValues')?.value;
    console.log('Option Name:', optionName);
    console.log('Option Values:', optionValues);
  }

}
