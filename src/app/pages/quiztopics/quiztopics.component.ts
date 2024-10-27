import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { AssignquizComponent } from '../assignquiz/assignquiz.component';
import { AddtopicComponent } from '../addtopic/addtopic.component';
import { TopicSericesService } from 'src/app/shared/topic-serices.service';
import { UpdatetopicComponent } from '../updatetopic/updatetopic.component';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';
import { MatDialog } from '@angular/material/dialog';
import { faArrowRight, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-quiztopics',
  templateUrl: './quiztopics.component.html',
  styleUrls: ['./quiztopics.component.css']
})
export class QuiztopicsComponent {
  topicList:any[]=[];
  faCoffee = faArrowRight;
  faEdit   = faEdit
  faView   = faEye
  constructor(
    private _location: Location,
    private getTopiclist: QuiztopicsService,
    private route: Router,
    private dialog: MatDialog,
    private sharedTopic : TopicSericesService
  ) {  }

  backClicked() {
    this._location.back();
  };
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTopicslist();
    this.sharedTopic.topics$.subscribe((newtopic)=>{
      this.topicList = [newtopic,...this.topicList];
    })
  };

  openAssignQuiz(quizid: any) {
    this.dialog.open(AssignquizComponent, {
      width: '100%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: {quizid}
    });
  }

  addTopicPopup() {
    this.dialog.open(AddtopicComponent, {
      width: '80%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
    });
  };

  editTopicPopup(quiz_id: any) {
    const dialogRf = this.dialog.open(UpdatetopicComponent, {
      width: '80%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: quiz_id
    })
    dialogRf.afterClosed().subscribe(result => {
      if (result) {
        this.getTopicslist() // Optionally reload topics if needed
      }
    });
  };

  openAssignedQuestions(quizid:number){
    const dialogRf = this.dialog.open(UpdatetopicComponent, {
      width: '80%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: quizid
    });

    dialogRf.afterClosed().subscribe(result => {
      if (result) {
        this.getTopicslist() // Optionally reload topics if needed
      }
    });
  }

  getTopicslist() {
    this.getTopiclist.getTopics().subscribe((res: any) => {
      if (res) { 
        this.topicList = res;
      } else {
        alert("geting some problem");
      }
    });
  };

}

