import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDto } from 'src/app/Model/userDto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends BaseFormComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toast: ToastrService
  ) {
    super();
  }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', Validators.required],
    });
  }
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  onSignUp() {
    if (this.signupForm.valid) {
      let userDto: UserDto = new UserDto();

      userDto.UserName = this.signupForm.value['username'];
      userDto.Password = this.signupForm.value['password'];
      userDto.FristName = this.signupForm.value['firstname'];
      userDto.LastName = this.signupForm.value['lastname'];
      userDto.Email = this.signupForm.value['email'];
      this.service.signUp(userDto).subscribe({
        next: (res) => {
          this.toast.success('User Registered!', 'Success');
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.toast.error(err?.error.message, 'Something Is wrong!');
          // this.router.navigate(['login']);
        },
      });
      //send object
    } else {
      this.validateAllformFileds(this.signupForm);
      this.toast.error('your Form is Invalid', 'Error');
    }
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
