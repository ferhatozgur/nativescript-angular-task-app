import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: Task = { id: 0, title: '', status: '', completed: false };

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = +this.route.snapshot.params.id;
    this.taskService.getTask(taskId).subscribe(task => {
      console.log('Görev Yüklendi:', task); 
      this.task = task;
    });
  }

  updateTask() {
    console.log('Güncellenen Görev:', this.task); // Güncellenen görevi kontrol et
    this.taskService.updateTask(this.task.id, this.task).subscribe(response => {
      console.log('Görev başarıyla güncellendi');
      this.router.navigate(['/tasks']);
    });
  }

  deleteTask() {
    console.log('Silinen Görev ID:', this.task.id); // Silinen görevi kontrol et
    this.taskService.deleteTask(this.task.id).subscribe(response => {
      console.log('Görev başarıyla silindi');
      this.router.navigate(['/tasks']);
    });
  }
}
