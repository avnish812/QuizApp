export interface APIResponse{
    quiz_id:number,
    quiz_topic:string,
    quiz_duration:number,
    status:string
}

export class Topics{
    quiz_topic:string;
    quiz_duration:number;
    status:string;
    constructor(){
        this.quiz_topic = '';
        this.quiz_duration = 0;
        this.status = '';
    }
}

export class LoginModel{
    email:string;
    password:string;
    constructor(){
        this.email = '';
        this.password = '';
    }
}

export interface QuizTopic {
    quiz_id: string;
    quiz_topic?: string;
    quiz_duration?: string;
    status?: string;
}

export interface ADDQUESTION {
    question_type: string;
    question: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    marks: number;
    status: string;
    correct_answer: string;
    quiz_id: string;
}
export interface TopicQuestion {

    correct_answer: string;
    marks: number;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    question: string;
    question_id: number;
    question_type: string;
    quiz_topic: string;
    status: string;
}

