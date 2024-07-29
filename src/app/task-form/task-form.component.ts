import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  statuses = ['Pending', 'Completed', 'In Progress', 'Cancelled'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(response => {
        console.log('Görev başarıyla oluşturuldu', response);
        // Cihaz titreşimi zaten TaskService içinde
      });
    }
  }
}
