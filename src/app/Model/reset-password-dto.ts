export class ResetPasswordDto {
  public email!: string;
  public emailToken!: string;
  public newPassword!: string;
  public confirmPassword!: string;
}
