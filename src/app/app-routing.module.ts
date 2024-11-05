import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { QuiztopicsComponent } from './pages/quiztopics/quiztopics.component';
import { UploadfileComponent } from './pages/uploadfile/uploadfile.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AddtopicComponent } from './pages/addtopic/addtopic.component';
import { AssignquizComponent } from './pages/assignquiz/assignquiz.component';
import { UpdatetopicComponent } from './pages/updatetopic/updatetopic.component';
import { myauthGuard } from './core/guard/myauth.guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { EditquestionComponent } from './pages/editquestion/editquestion.component';
import { QuizQuestionsComponent } from './pages/quiz-questions/quiz-questions.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { ProductsComponent } from './pages/products/products.component';
import { UserlistsComponent } from './pages/userlists/userlists.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [myauthGuard], data: { expectedRole: 'Administrator' } },
      { path: 'userdashboard', component: UserDashboardComponent, canActivate: [myauthGuard], data: { expectedRole: 'Participant' } },
      { path: 'quiztopics', component: QuiztopicsComponent , canActivate: [myauthGuard], data: { expectedRole: 'Administrator' } },
      { path: 'addtopic', component: AddtopicComponent, canActivate: [myauthGuard], data: { expectedRole: 'Administrator' }  },
      { path: 'assignquiz', component: AssignquizComponent, canActivate: [myauthGuard], data: { expectedRole: 'Administrator' }  },
      { path: 'updatetopic', component: UpdatetopicComponent, canActivate: [myauthGuard], data: { expectedRole: 'Administrator' }  },
      { path: 'quiz-question/:quiz_id', component: QuizQuestionsComponent, canActivate: [myauthGuard], data: { expectedRole: 'Administrator' }  },
      { path: 'add-question', component:AddQuestionComponent , canActivate: [myauthGuard], data: { expectedRole: 'Administrator' } },
      { path: 'editquestion/:question_id', component: EditquestionComponent, canActivate: [myauthGuard], data: { expectedRole: 'Administrator' }  },
      { path: 'userlists', component: UserlistsComponent, canActivate: [myauthGuard], data: { expectedRole: 'Administrator' }  },
      { path: 'products', component: ProductsComponent,},
      { path: 'notauthorized', component: NotAuthorizedComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
