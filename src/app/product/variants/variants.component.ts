import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VariantItemDto } from 'src/app/Model/variant-item';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, ValueFormatterParams, ValueParserParams } from 'ag-grid-community';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ColGroupDef } from 'ag-grid-community';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  variantForm: FormGroup;
  private draggedVariantIndex: number | null = null;
  variantList: VariantItemDto[] = [];
  editingRowIndex: { [s: string]: VariantItemDto } = {};
  public editType: 'fullRow' = 'fullRow';

  constructor(private formBuilder: FormBuilder) {
    this.variantForm = this.formBuilder.group({
      region: [null, Validators.required],
      variantItems: this.formBuilder.array([]),
      // Explicitly specify the type for each control
      // price: [null, Validators.required], // Add this line for 'price'
      // available: [null, Validators.required], // Add this line for 'available'
      // onHand: [null, Validators.required], // Add this line for 'onHand'
      // sku: [null, Validators.required], // Add this line for 'sku'
      // barcode: [null, Validators.required], // Add this line for 'barcode'
      // editing: [false], // Add this line for 'editing'
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

  get variantItems(): FormArray {
    return this.variantForm.get('variantItems') as FormArray;
  }

  ngOnInit() {
    this.fetchVariantData();
  }

  private async fetchVariantData() {
    const initialVariant: VariantItemDto = {
     // id: '1',
      variant: 'AA',
      price: 0,
      available: 0,
      onHand: 0,
      sku: '',
      barcode: '',
     // editing: false,
    };

    // Push the initial variant to both the form and variantList
    this.variantItems.push(this.createVariantFormGroup(initialVariant));
    this.variantList.push(initialVariant);
  }
  private createVariantFormGroup(variant: VariantItemDto): FormGroup {
    return this.formBuilder.group({
     // id: [variant.id],
      variant: [variant.variant],
      price: [variant.price, Validators.required], // Specify the type and validators
      available: [variant.available, Validators.required], // Specify the type and validators
      onHand: [variant.onHand, Validators.required], // Specify the type and validators
      sku: [variant.sku, Validators.required], // Specify the type and validators
      barcode: [variant.barcode, Validators.required], // Specify the type and validators
     // editing: [variant.editing],
    });
  }

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
    return this.variantItems.at(index) as FormGroup;
  }

  removeItem(index: number): void {
    this.variantItems.removeAt(index);
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
      const variant = this.variantItems.at(this.draggedVariantIndex);
      this.variantItems.removeAt(this.draggedVariantIndex);
      this.variantItems.insert(targetIndex, variant);

      this.draggedVariantIndex = null;
    }
  }

  onEdit(variant: VariantItemDto) {
    const index = this.variantList.findIndex((item) => item.id === variant.id);
    if (index !== -1) {
      const variantFormGroup = this.variantItems.at(index) as FormGroup;
      variantFormGroup.patchValue({
        price: variant.price,
        available: variant.available,
        onHand: variant.onHand,
        sku: variant.sku,
        barcode: variant.barcode,
      });
    }

    this.editingRowIndex[variant.id as string] = { ...variant };
  }

  onSave(variant: VariantItemDto, rowIndex: number) {
    this.variantList[rowIndex].editing = false;
   // this.editingRowIndex = null;
  }

  onCancel(rowIndex: number) {
    this.variantList[rowIndex].editing = false;
  //  this.editingRowIndex = null;
  }
  getPriceControl(index: number): FormControl | null {
    const variantFormGroup = this.variantItems.at(index) as FormGroup | null;
    return variantFormGroup ? variantFormGroup.get('price') as FormControl : null;
  }
  getAvailableControl(index: number): FormControl | null {
    const variantFormGroup = this.variantItems.at(index) as FormGroup | null;
    return variantFormGroup ? variantFormGroup.get('available') as FormControl : null;
  }
  getOnHandControl(index: number): FormControl | null {
    const variantFormGroup = this.variantItems.at(index) as FormGroup | null;
    return variantFormGroup ? variantFormGroup.get('onHand') as FormControl : null;
  }
  getSkuControl(index: number): FormControl | null {
    const variantFormGroup = this.variantItems.at(index) as FormGroup | null;
    return variantFormGroup ? variantFormGroup.get('sku') as FormControl : null;
  }
  getBarcodeControl(index: number): FormControl | null {
    const variantFormGroup = this.variantItems.at(index) as FormGroup | null;
    return variantFormGroup ? variantFormGroup.get('barcode') as FormControl : null;
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

}
