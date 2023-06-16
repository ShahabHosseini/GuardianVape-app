import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from '../../base/base-form.component';
import { UserService } from '../user.service';
import { UserDto } from '../../Model/userDto';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toast: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      //send object
      let userDto: UserDto = new UserDto();

      userDto.UserName = this.loginForm.value['username'];
      userDto.Password = this.loginForm.value['password'];

      this.service.login(userDto).subscribe({
        next: (res) => {
          this.service.storeToken(res.token);
          this.toast.success('Login Succes!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toast.error(err?.console.error(), 'User Not Found!');
        },
      });
    } else {
      this.validateAllformFileds(this.loginForm);
      this.toast.error('your Form is Invalid', 'Error');
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
