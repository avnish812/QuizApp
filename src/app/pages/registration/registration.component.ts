
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  education: string[] = [
    "Metric",
    "Intermediate",
    "Graduate",
    "Post Graduate"
  ]

  regForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
    ) {  //formbulder service injected


    this.regForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: [''],
      password: [''],
      email: [''],
      gender: [''],
      role: [''],
      isactive: [''],
    });
  };




}
