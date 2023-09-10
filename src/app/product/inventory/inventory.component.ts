import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdTitleDto } from 'src/app/Model/id-title-dto';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  Country: IdTitleDto[] = [];
  skuShow: boolean = false;
  inventoryForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.inventoryForm = this.formBuilder.group({
      trackQuantity: [true, Validators.required],
      outOfStock: [true, Validators.required],
      skuShows: [false, Validators.required],
      shopLocation: [0, Validators.required],
      sku: ['', Validators.required],
      barcode: ['', Validators.required],
    });
  }
  onValueChange() {}
  onCountrySelectionChange(event: any) {}
  onSkuValueChange() {
    this.skuShow = !this.skuShow;
  }
}
