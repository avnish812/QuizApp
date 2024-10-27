import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, ɵHttpInterceptorHandler } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  FilterOptionsPipe, LoginComponent } from './pages/login/login.component';
import { MaterialModule } from 'src/material.module';
import { HomeComponent } from './pages/home/home.component';
import { UserlistingComponent } from './pages/userlisting/userlisting.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { AssignquizComponent } from './pages/assignquiz/assignquiz.component';

import { AddtopicComponent } from './pages/addtopic/addtopic.component';
import { UpdatetopicComponent } from './pages/updatetopic/updatetopic.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { TopicSericesService } from './shared/topic-serices.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuiztopicsComponent } from './pages/quiztopics/quiztopics.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LayoutComponent } from './pages/layout/layout.component';
import { CustomeInterceptor } from './core/interceptor/custome.interceptor';
import { AuthService } from './core/services/auth.service';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { MatCommonModule } from '@angular/material/core';
import {  NotificationService } from './core/services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditquestionComponent } from './pages/editquestion/editquestion.component';
import {  statusPipe } from './shared/pipes/status.pipe';
import { QuizQuestionsComponent } from './pages/quiz-questions/quiz-questions.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { ProductsComponent } from './pages/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UserlistingComponent,
    DashboardComponent,
    NavbarComponent,
    UserDashboardComponent,
    AssignquizComponent,
    UpdatetopicComponent,
    FilterOptionsPipe,
    AddtopicComponent,
    QuiztopicsComponent,
    LayoutComponent,
    NotAuthorizedComponent,
    EditquestionComponent,
    statusPipe,
    QuizQuestionsComponent,
    AddQuestionComponent,
    ProductsComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCommonModule,
    MatSnackBarModule,
    
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),


  ],
  providers: [
    TopicSericesService,
    AuthService,
    NotificationService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:CustomeInterceptor,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
