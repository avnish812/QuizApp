import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicSericesService {

  constructor() { }
  private topicAdded= new BehaviorSubject<any>([]);
  topics$ = this.topicAdded.asObservable();

  anounceTopicAdded(topic:any){
    const currentTopic = this.topicAdded.value;
    this.topicAdded.next(topic)
  }
}
