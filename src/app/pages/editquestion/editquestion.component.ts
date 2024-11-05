import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {
  editQForm: FormGroup
  ques_id!: any;
  quiz_id:string='';
  constructor(
    private fb: FormBuilder,
    private QTS: QuiztopicsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editQForm = this.fb.group({
      question_id: ['', [Validators.required]],
      question_type: ['', [Validators.required]],
      question: ['', [Validators.required]],
      option_1: ['', [Validators.required]],
      option_2: ['', [Validators.required]],
      option_3: ['', [Validators.required]],
      option_4: ['', [Validators.required]],
      correct_answer: ['', [Validators.required]],
      marks: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    console.log(this.route)
    this.quiz_id = this.route.snapshot.queryParams['quiz_id']
    this.ques_id = this.route.snapshot.params['question_id'];
    this.getQuesDataById();
  };

  editQues(data: any) {
    this.editQForm.patchValue({
      question_id: data[0].question_id,
      question_type: data[0].question_type,
      question: data[0].question,
      option_1: data[0].option_1,
      option_2: data[0].option_2,
      option_3: data[0].option_3,
      option_4: data[0].option_4,
      correct_answer: data[0].correct_answer,
      marks: data[0].marks,
      status: data[0].status,
    })
  }

  getQuesDataById() {
    const ques_id = {
      'question_id': this.ques_id
    };
    this.QTS.questionById(ques_id).subscribe({
      next: (res) => {
        this.editQues(res)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  };

  updateQuestion() {
    const payload = {
      ...this.editQForm.value
    };
    this.QTS.editQuestion(payload).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['quiz-question',this.quiz_id])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
