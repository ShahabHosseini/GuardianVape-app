import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CountryDto } from 'src/app/Model/country-dto';
import { CommonService } from 'src/app/api/Common/common.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements AfterViewInit {
  shippingForm: FormGroup;
  unit: SelectItem[] = [];
  regions: SelectItem[] = [];
  filterText: string = ''; // Declare filterText property
  filterPlaceholderText: string = 'Search';

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {
    this.shippingForm = this.formBuilder.group({
      weight: [true, Validators.required],
      unit: ['', Validators.required],
      trackQuantity: [false, Validators.required],
      shopLocation: [0, Validators.required],
      region: [null, Validators.required],
    });

    this.unit = [
      { label: 'lb', value: 'lb' },
      { label: 'oz', value: 'oz' },
      { label: 'kg', value: 'kg' },
      { label: 'g', value: 'g' },
    ];
  }
  ngAfterViewInit(): void {
    // Fetch countries/regions from your service

    this.commonService.getAllCountry().subscribe((res: CountryDto[]) => {
      this.regions = res.map((item) => ({
        label: item.nicename,
        value: item, // You can change this to the property you want to use as the value
      }));
      let unitedKindom: CountryDto = {
        id: 225,
        iso: 'GB',
        iso3: 'GBR',
        nicename: 'United Kingdom',
        numcode: 826,
        phonecode: 44,
        title: 'UNITED KINGDOM',
      };

      this.shippingForm.get('region')?.setValue(unitedKindom);
      console.log('OutPut:', this.shippingForm.get('region')?.value);
    });
  }

  onValueChange() {
    // Handle checkbox value change if needed
  }

  onUnitSelectionChange(event: any) {
    // Handle unit selection change if needed
  }

  onRegionSelectionChange(event: any) {
    console.log(event);
    // Handle region selection change if needed
  }
  onFilter(event: any) {}
}
