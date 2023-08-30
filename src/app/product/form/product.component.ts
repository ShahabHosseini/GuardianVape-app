import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  title: string = 'Add product';
  productForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      active: [true, Validators.required],
    });
  }

  goToList() {
    this.router.navigate(['collection-list']);
  }

  onValueChange() {}
}
