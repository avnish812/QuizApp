import { AuthService } from '../../core/services/auth.service';
import { Component, HostListener, Injectable, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { customValidators } from 'src/app/core/validators/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, customValidators.email]],
      password: ['', [Validators.required, customValidators.password]]
    });
  };


  login() {
    this.service.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token)
          const decodedToken: any = jwtDecode(res.token);
          const role = decodedToken.role;
          localStorage.setItem('role', role);
          switch (res.role) {
            case 'Administrator':
              this.router.navigate(['dashboard']);
              break;
            case 'Participant':
              this.router.navigate(['user-dashboard']);
              break;
            default:
              this.router.navigate(['login']);
              break;
          }
        } else {
          alert("geting some problem");
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

}

// Define the FilterOptionsPipe directly in this file
@Pipe({
  name: 'filterOptions'
})
export class FilterOptionsPipe implements PipeTransform {
  transform(options: string[], filterValue: string): string[] {
    if (!filterValue) {
      return options;
    }
    const filter = filterValue.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filter));
  }
}
