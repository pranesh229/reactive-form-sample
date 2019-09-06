import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  profileForm = new FormGroup(
    {
      firstname: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        this.noWhitespaceValidator
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        this.noWhitespaceValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.noWhitespaceValidator
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
        // Minimum eight characters, at least one letter, one number and one special character.
        // Ref https://stackoverflow.com/a/21456918/3409030
      ]),
      retypePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
        // Minimum eight characters, at least one letter, one number and one special character.
        // Ref https://stackoverflow.com/a/21456918/3409030
      ])
    },
    { validators: this.checkPasswords }
  );
  constructor() {}

  ngOnInit() {}
  checkpassword(group: FormGroup) {}
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group

    const pass = group.get('password').value;
    const retypePassword = group.get('retypePassword').value;

    return pass === retypePassword ? null : { notSame: true };
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
  }

  get firstname() {
    return this.profileForm.get('firstname');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get password() {
    return this.profileForm.get('password');
  }
  get retypePassword() {
    return this.profileForm.get('retypePassword');
  }
}
