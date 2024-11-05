import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  edituserform: FormGroup

  constructor(private fb: FormBuilder, 
    private matdialogref:MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

  ) { 
    this.edituserform = this.fb.group({
      name:[data.name,[Validators.required]],
      email:[data.email,[Validators.required]],
      status:[data.status,[Validators.required]]

    })
  }
  editForm(){ 
    
  }
}
