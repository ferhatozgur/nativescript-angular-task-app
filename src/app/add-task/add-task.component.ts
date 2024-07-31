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
  task: Task = { id: 0, title: '', status: 'Pending', completed: false };

  constructor(private taskService: TaskService, private router: Router) {}

  onAddTask(): void {
    this.task.id = Math.floor(Math.random() * 10000); // Benzersiz ID atanması
    this.taskService.createTask(this.task).subscribe((newTask) => {
      console.log('Görev başarıyla oluşturuldu', newTask);
      this.router.navigate(['/tasks']);
    });
  }
}
