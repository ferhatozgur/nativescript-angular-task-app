import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  username: string | null = '';

  constructor(private taskService: TaskService, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
