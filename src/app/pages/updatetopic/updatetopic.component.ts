import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuizTopic } from 'src/app/core/models/API.Models';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';
import { TopicSericesService } from 'src/app/shared/topic-serices.service';

@Component({
  selector: 'app-updatetopic',
  templateUrl: './updatetopic.component.html',
  styleUrls: ['./updatetopic.component.css']
})
export class UpdatetopicComponent implements OnInit {
  editTopicForm: FormGroup
  status = [
    { value: 'A', name: 'Active' },
    { value: 'D', name: 'Inactive' }];


  constructor(
    private bulder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdatetopicComponent>,
    public QTS: QuiztopicsService,
    public sharedSer: TopicSericesService
  ) {
    this.editTopicForm = this.bulder.group({
      quiz_topic: ['', [Validators.required]],
      quiz_duration: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  };

  ngOnInit(): void {
    this.fetchTopicById()
  };

  fetchTopicById() {
    const requestData = { 'quiz_id': this.data }
    this.QTS.topicById(requestData).subscribe({
      next: (data: any) => {
        this.editForm(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  };

  editForm(quizData: any) {
    this.editTopicForm.setValue({
      quiz_topic: quizData[0].quiz_topic,
      quiz_duration: quizData[0].quiz_duration,
      status: quizData[0].status
    })
  }

  saveEdit() {
    const updatedData = {
      ...this.editTopicForm.value,
      'quiz_id': this.data
    };
    this.QTS.editTopic(updatedData).subscribe({
      next: (data: any) => {
        this.sharedSer.anounceTopicAdded(updatedData)
        this.dialogRef.close(true)
      },
      error: (err) => {

      }
  })

  }
}
