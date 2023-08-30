import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  pricingForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.pricingForm = this.formBuilder.group({
      price: ['0', Validators.required],
      compareAtPrice: ['0', Validators.required],
      costPerItem: ['0', Validators.required],
      taxCharge: [true, Validators.required],
    });
  }
  onValueChange() {}
}
