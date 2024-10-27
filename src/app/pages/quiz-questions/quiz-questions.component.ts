import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { subscribeOn, Subscription } from 'rxjs';
import { Topics } from 'src/app/core/models/API.Models';
import { NotificationService } from 'src/app/core/services/notification.service';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';
@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent {
  faedit = faEdit
  quiz_id:any='';
  topicQ:any[]=[]
  
  constructor(
    public route: ActivatedRoute,
    public QTS:QuiztopicsService,
    private notify:NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.quiz_id = params['quiz_id'];
      if(this.quiz_id){
        this.getQById()
      } else{
        console.log('quizid is undefined')
      }
    })
  }

  getQById(){
    const payload = {
      'quiz_id':Number(this.quiz_id)
    }
    this.QTS.getQ(payload).subscribe({
      next:(value:any) =>{
        this.topicQ = value;
        this.notify.showError
      },
      error:(err) =>{
        console.log(err)
        this.notify.showError(`No Question Found : ${err.error.error.message}`)
      },
    })
  }
}
