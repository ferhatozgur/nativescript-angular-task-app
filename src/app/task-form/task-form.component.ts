import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = { id: 0, title: '', status: '', completed: false };
  taskForm: FormGroup;
  statuses = ['Pending', 'Completed', 'In Progress', 'Cancelled'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: [this.task.title, Validators.required],
      status: [this.task.status, Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.task);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.task,
        ...this.taskForm.value
      };
      if (this.task.id === 0) {
        this.taskService.createTask(updatedTask).subscribe(response => {
          console.log('Görev başarıyla oluşturuldu', response);
        }, error => {
          console.error('Görev oluşturulurken hata:', error);
        });
      } else {
        this.taskService.updateTask(this.task.id, updatedTask).subscribe(response => {
          console.log('Görev başarıyla güncellendi', response);
        }, error => {
          console.error('Görev güncellenirken hata:', error);
        });
      }
    }
  }
}
