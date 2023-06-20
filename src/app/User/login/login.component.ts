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
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../user-store.service';
import ValidateForm from 'src/app/helpers/validationform';

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
    private toast: ToastrService,
    private userStore: UserStoreService
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
      console.log(this.loginForm.value);
      this.service.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.service.storeToken(res.accessToken);
          this.service.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.service.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success('SUCCESS', res.message);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toast.error('ERROR', 'Something when wrong!');
          console.log(err);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
