import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordDto } from '../../Model/reset-password-dto';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validationform';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  emailToReset!: string;
  emailToken!: string;
  resetPasswordDto = new ResetPasswordDto();
  resetForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
    this.activatedRoute.queryParams.subscribe((val) => {
      this.emailToReset = val['email'];

      let urlToken = val['code'];
      this.emailToken = urlToken.replace(/ /g, '+');
    });
  }
  onChange() {
    if (this.resetForm.valid) {
      this.resetPasswordDto.email = this.emailToReset;
      this.resetPasswordDto.newPassword = this.resetForm.value.password;
      this.resetPasswordDto.confirmPassword =
        this.resetForm.value.confirmPassword;
      this.resetPasswordDto.emailToken = this.emailToken;
      this.service.resetPassord(this.resetPasswordDto).subscribe({
        next: (res) => {
          this.toast.success(
            'Success',
            'Your password has been change successfuly'
          );
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.toast.error('Error', 'Somthing Hapened');
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.resetForm);
    }
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
