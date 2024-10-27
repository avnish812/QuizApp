import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  @ViewChild('topic') topic!:ElementRef;
  questionForm!: FormGroup;
  getQuestionAnswers: any;
  allOptions$: Observable<any[]> | undefined;
  selectedTopicId:number | undefined
  constructor(
    private fb: FormBuilder,
    private QTS: QuiztopicsService,
    private router: Router,
    private notify: NotificationService
  ) { };

 
  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: [''],
      question_type: [''],
      option_1: [''],
      option_2: [''],
      option_3: [''],
      option_4: [''],
      marks: [''],
      status: [''],
      correct_answer: [''],
      quiz_id: [''],
    })

    this.allOptions$ = combineLatest([
      this.questionForm.get('option_1')!.valueChanges.pipe(startWith(this.questionForm.get('option_1')!.value)),
      this.questionForm.get('option_2')!.valueChanges.pipe(startWith(this.questionForm.get('option_2')!.value)),
      this.questionForm.get('option_3')!.valueChanges.pipe(startWith(this.questionForm.get('option_3')!.value)),
      this.questionForm.get('option_4')!.valueChanges.pipe(startWith(this.questionForm.get('option_4')!.value)),
    ]).pipe(
      map(([option1, option2, option3, option4]) => {
        return [option1, option2, option3, option4].filter(value => value && value.trim() !== '');
      })
    );
    this.getTopics();
  };

  topicSelected(e: any) {
    console.log(e)
    const selectedTopic = e.value; 
    //  this.questionForm.controls['quiz_id'].setValue(selectedTopic.quiz_topic)
    this.questionForm.get('quiz_id')?.setValue(selectedTopic);
    this.selectedTopicId = selectedTopic;
    console.log(typeof this.selectedTopicId)
  };

  onQuestionTypeSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedType = event.option.value;
    this.questionForm.get('question_type')?.setValue(selectedType);
  }


  getTopics() {
    this.QTS.getTopics().subscribe({
      next: (res) => {
        console.log(res)
        this.getQuestionAnswers = res;
      },
      error:(err)=> {
        console.log(err);
      },
    })
  };

  postQuestion() {
    const payload = this.questionForm.value;
    
    // Adjust payload based on question type
    if (payload.question_type !== 'MCQ') {
      delete payload.option_1;
      delete payload.option_2;
      delete payload.option_3;
      delete payload.option_4;
      delete payload.correct_answer;
      delete payload.marks;
    }

    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      this.notify.showError('Please fill all required fields correctly.');
      return;
    }
    this.QTS.addQuestion(payload).subscribe({
      next: (value) => {
        console.log(value)
        this.notify.showSuccess('Question Added Succesfully !')
        this.router.navigate(['quiz-question',this.selectedTopicId])
      },
      error: (err) => {
        console.log(err);
        this.notify.showError(`Failed to add Question: ${err.error.error.message}`)
      },
    })
  };
}
