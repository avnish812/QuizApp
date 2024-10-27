import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { APIResponse } from 'src/app/core/models/API.Models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  users=faUsers
  userCount: any;
  topicCount: any = [];
  role: any;
  constructor(private service: AuthService, private router: Router, private quizTopic: QuiztopicsService) { }
  ngOnInit(): void {
    this.getAllTopics()
  }

  getAllTopics() {
    this.quizTopic.getTopics().subscribe({
      next:(value:any)=> {
        this.topicCount = value.length;
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

}
