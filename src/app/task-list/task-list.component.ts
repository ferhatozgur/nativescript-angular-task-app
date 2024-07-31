import { Component, OnInit } from '@angular/core';
import { SecureStorage } from '@nativescript/secure-storage';
import { RouterExtensions } from '@nativescript/angular';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Manuel eklenen görevler
  apiTasks: Task[] = []; // API'den çekilen görevler
  username: string | null = '';
  secureStorage: SecureStorage;
  errorMessage: string = '';

  constructor(private taskService: TaskService, private router: RouterExtensions) {
    this.secureStorage = new SecureStorage();
  }

  ngOnInit(): void {
    this.secureStorage.get({ key: 'username' }).then(value => {
      this.username = value ? value : 'Kullanıcı';
    });

    // API'den görevleri çekip, sadece apiTasks değişkenine atıyoruz
    this.taskService.getTasks().subscribe(data => {
      this.apiTasks = data;
    });
  }

  logout() {
    this.secureStorage.remove({ key: 'username' }).then(() => {
      this.router.navigate(['/login']);
    });
  }

navigateToAddTask() {
  console.log('Navigating to Add Task');
  this.router.navigate(['/add-task']);
}

navigateToEditTask(task: Task) {
  console.log('Navigating to Edit Task', task);
  this.router.navigate(['/edit-task', task.id]);
}


  addTask(newTask: Task) {
    this.tasks.push(newTask);
  }
}
