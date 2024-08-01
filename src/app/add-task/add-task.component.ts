import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
[x: string]: any;
  task: Task = { id: 0, title: '', status: '', completed: false };
  status = [];
  constructor(private taskService: TaskService, private router: Router) {}

  onAddTask(): void {
    console.log('Yeni Görev:', this.task);
    this.taskService.createTask(this.task).subscribe((newTask) => {
      console.log('Görev başarıyla oluşturuldu', newTask);
      this.router.navigate(['/tasks']);
    });
  }
}



