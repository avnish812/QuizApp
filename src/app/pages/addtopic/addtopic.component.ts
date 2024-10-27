import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';
import { TopicSericesService } from 'src/app/shared/topic-serices.service';


@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.css']
})
export class AddtopicComponent {
  addFormData:FormGroup
  status = [
    { value: 'A', name: 'Active' },
    { value: 'D', name: 'Inative' }];

  constructor(
    private bulder: FormBuilder,
    private QTS: QuiztopicsService,
    private dialogRef:MatDialogRef<AddtopicComponent>,
    private sharedTopic : TopicSericesService
  ) {
    this.addFormData = this.bulder.group({
      quiz_topic: ['', [Validators.required]],
      quiz_duration: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
   }



  addTopicData():void {
    this.QTS.addTopics(this.addFormData.value).subscribe((res) => {
      if (res) {
        this.sharedTopic.anounceTopicAdded(this.addFormData.value);
        this.dialogRef.close(this.addFormData.value);
      } else {
        console.log('Form is invalid');
      }
    })
  };

}
