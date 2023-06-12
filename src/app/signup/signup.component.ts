import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../base/base-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends BaseFormComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    super();
  }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  onSubmit() {
    if (this.signupForm.valid) {
      //send object
      console.log(this.signupForm.value);
    } else {
      this.validateAllformFileds(this.signupForm);
      alert('your Form is Invalid');
    }
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
