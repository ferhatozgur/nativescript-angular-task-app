import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: Task = { id: 0, title: '',  status: '' };
  statuses = ['Pending', 'Completed', 'In Progress', 'Cancelled'];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: RouterExtensions
  ) {}

  ngOnInit(): void {
    const taskId = +this.route.snapshot.params.id;
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
    });
  }

  updateTask() {
    this.taskService.updateTask(this.task.id, this.task).subscribe(response => {
      console.log('Görev başarıyla güncellendi', response);
      this.router.navigate(['/tasks']);
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe(response => {
      console.log('Görev başarıyla silindi', response);
      this.router.navigate(['/tasks']);
    });
  }
}
