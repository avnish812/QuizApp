import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Topics, APIResponse, QuizTopic, ADDQUESTION, TopicQuestion } from '../models/API.Models';
import { Constant } from '../constant/constant';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class QuiztopicsService {
    private apiUrl = environment.API_URL;
    constructor(private http: HttpClient) { }

    getTopics(): Observable<APIResponse> {
        return this.http.get<APIResponse>(`${this.apiUrl}` + Constant.API_END_POINT.GET_TOPICS)
    };

    addTopics(obj: Topics): Observable<Topics> {
        return this.http.post<APIResponse>(`${this.apiUrl}` + Constant.API_END_POINT.ADD_TOPIC, obj,
            {responseType: 'text' as 'json' })
    };

    topicById(data: { quiz_id: string }): Observable<QuizTopic> {
        return this.http.post<QuizTopic>(`${this.apiUrl}` + Constant.API_END_POINT.TOPIC_ID, data);
    };

    editTopic(edit: Topics) {
        return this.http.post<APIResponse>(`${this.apiUrl}` + Constant.API_END_POINT.EDIT_TOPIC, edit,
            { responseType: 'text' as 'json' }
        )
    };

    quizAssinedUsers(ID: any) {
        return this.http.post<any>(`${this.apiUrl}` + Constant.API_END_POINT.QUIZ_ASSIGNED_USERS, ID)
    };

    quizAssigned(assignData:any) {
        return this.http.post<any>(`${this.apiUrl}` + Constant.API_END_POINT.QUIZ_ASSIGNED,assignData,
            { responseType: 'text' as 'json' }
        )
    };

    getQ(id:any): Observable<TopicQuestion>{
        return this.http.post<TopicQuestion>(`${this.apiUrl}`+Constant.API_END_POINT.TOPIC_QUESTIONS,id)
    };

    addQuestion(data:any): Observable<any>{
        const res =  this.http.post<any>(`${this.apiUrl}` + Constant.API_END_POINT.ADD_QUESTIONS, data,
            { responseType: 'text' as 'json'}
        )
        return res
    };

    questionById(q_id:any):Observable<ADDQUESTION>{
        return this.http.post<ADDQUESTION>(`${this.apiUrl}`+ Constant.API_END_POINT.QUESTION_BY_ID,q_id)
    }
    editQuestion(data:any):Observable<ADDQUESTION>{
        return this.http.post<ADDQUESTION>(`${this.apiUrl}`+ Constant.API_END_POINT.EDIT_QUESTION,data,
            { responseType: 'text' as 'json'}

        )
    };

    getAllProducts(){
        return this.http.get('https://fakestoreapi.com/products');
    }

}
