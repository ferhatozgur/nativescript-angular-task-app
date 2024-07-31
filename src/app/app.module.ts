import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptHttpClientModule, NativeScriptFormsModule } from '@nativescript/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskService } from './task.service';
//import { PickerValueAccessor } from './select-value-accessor.directive'; // Yeni dosyayı buraya ekleyin

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskFormComponent,
    TaskListComponent,
    AddTaskComponent,
    EditTaskComponent,
  //  PickerValueAccessor // Yeni dosyayı buraya ekleyin
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    HttpClientModule,
    FormsModule,
    NativeScriptFormsModule,
    ReactiveFormsModule // ReactiveFormsModule burada yüklendi
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
