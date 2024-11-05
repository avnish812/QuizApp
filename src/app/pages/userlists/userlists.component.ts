import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-userlists',
  templateUrl: './userlists.component.html',
  styleUrls: ['./userlists.component.css']
})
export class UserlistsComponent implements OnInit{
  userslist= new MatTableDataSource<any>();
dispalayedColumns:string[] = ['serialno','name','email','status','edit'];
@ViewChild(MatPaginator) paginator!:MatPaginator;
@ViewChild(MatSort) sort!:MatSort;
  constructor(private authservice:AuthService, private dialog:MatDialog){}
  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.authservice.userslist().subscribe((users:any)=>{
      this.userslist.data = users;
      this.userslist.paginator = this.paginator;
      this.userslist.sort = this.sort;
    })
  };

  applyFilter(e:any){}

  addNewUser(){

  }
  editUser(data:any){
    const dilogRef = this.dialog.open(EditUserComponent,{
      width:'400px',
      data:data
    })
  }
}
