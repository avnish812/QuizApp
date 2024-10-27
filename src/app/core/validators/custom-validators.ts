import { AbstractControl, ValidationErrors } from "@angular/forms";

export class customValidators{
    static email(control:AbstractControl):ValidationErrors | null{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const valid = emailRegex.test(control.value)
        return valid ? null:{email:true}
    }

    static password(control:AbstractControl):ValidationErrors | null{
        const password = control.value;
        if(!password){
            return null;
        };
        const hasUprCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /@/.test(password);
        const  minLength = password.length >= 6;
        const valid = hasUprCase && hasNumber && hasSpecialChar && minLength;

        if (!valid) {
            return {
              password: true,
              requirements: {
                hasUprCase,
                hasNumber,
                hasSpecialChar,
                minLength
              }
            };
          }
          return null;
    }
    static required(control: AbstractControl): ValidationErrors | null {
        return control.value ? null : { required: true };
      }
}