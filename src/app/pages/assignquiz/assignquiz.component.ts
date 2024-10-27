
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';


@Component({
  selector: 'app-assignquiz',
  templateUrl: './assignquiz.component.html',
  styleUrls: ['./assignquiz.component.css']
})
export class AssignquizComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'assigned', 'selected'];
  dataSource!: MatTableDataSource<any>;
  allSelected: any
  assignedUsersList: any[] = [];
  assinedId: any = []
  isAllSelected: boolean = false;
  isSomeSelected: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myProductDetails:any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    public QTS: QuiztopicsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AssignquizComponent>
  ) { };

  ngOnInit(): void {
    this.showAssignedUsers()
  };










  closePopup() {
    this.dialogRef.close("Uff");
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  showAssignedUsers() {
    this.QTS.quizAssinedUsers(this.data).subscribe({
      next: (value) => {
        console.log(value)
        this.assignedUsersList = value
        this.dataSource = new MatTableDataSource(this.assignedUsersList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {

      }
    })
  }


  toggleSelectAll(event: any) {
    const checked = event.checked;
    this.assignedUsersList.forEach((user: any) => user.selected = checked);
    this.updateSelectAllState();
  }

  selectOne() {
    this.updateSelectAllState();
  }

  private updateSelectAllState() {
    const allSelected = this.assignedUsersList.every((user: any) => user.selected);
    const someSelected = this.assignedUsersList.some((user: any) => user.selected);

    this.isAllSelected = allSelected;
    this.isSomeSelected = someSelected && !allSelected;
  }

  saveAssigned() {
    this.assignedUsersList.filter(data => {
      if (data.selected) this.assinedId.push(data.user_id)
    })
    const reqData = {
      assigned_users: this.assinedId,
      quiz_id: this.data
    }
    this.QTS.quizAssigned(reqData).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close(true)
      },
      error: (err) => {
        console.log(err)
      }

    })
  }

}



