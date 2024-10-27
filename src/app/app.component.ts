
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{

  title = 'training';
  userData:any;
  constructor(  private dialog:MatDialog) {  }

  loginOpen(){
    this.dialog.open(LoginComponent);
  }


  ngOnInit(){
  }

}
