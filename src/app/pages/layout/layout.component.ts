import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(
    private authSer: AuthService,
    private route: Router
  ) { }

  role: string = '';

  navLinks = [
    { path: '/dashboard', label: 'Dashboard', roles: ['Administrator', 'Participant'] },
    { path: '/userdashboard', label: 'User Dashboard', roles: ['Participant'] },
    { path: '/quiztopics', label: 'Quiz', roles: ['Administrator'] },
    { path: '/add-question', label: 'Questions', roles: ['Administrator'] },
    { path: '/userlists', label: 'Participant List', roles: ['Administrator'] },
    { path: '/quizreport', label: 'Report', roles: ['Administrator'] },
    { path: '/products', label: 'Products', roles: ['Administrator'] },
    { path: '/uploadfile', label: 'Upload', roles: [] }  // Accessible to all roles

  ];

  ngOnInit() {
    this.getRole()
  }

  logout() {
    this.authSer.logout();
  }

  getRole() {
    this.authSer.currentUser.subscribe({
      next: (res) => {
        console.log(res)
        this.role = res?.role ||''
      },
      error: (err) => {

      }
    });
  }
  canShowLink(linkRoles: string[]): boolean {
     if (linkRoles.length === 0) {
      return true;
    }
    return linkRoles.includes(this.role);
  }

}
