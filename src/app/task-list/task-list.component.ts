import { Component, OnInit } from '@angular/core';
import { SecureStorage } from '@nativescript/secure-storage';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  username: string | null = '';
  secureStorage: SecureStorage;

  constructor(private taskService: TaskService, private router: Router) {
    this.secureStorage = new SecureStorage();
  }

  ngOnInit(): void {
    this.secureStorage.get({ key: 'username' }).then(value => {
      this.username = value ? value : 'Kullanıcı';
    });

    this.loadTasks();

    this.taskService.taskAdded$.subscribe(newTask => {
      const index = this.tasks.findIndex(task => task.id === newTask.id);
      if (index !== -1) {
        // Güncellenmiş veya silinmiş görevi listeden kaldır
        if (!newTask.title) {
          this.tasks.splice(index, 1);
        } else {
          this.tasks[index] = newTask;
        }
      } else {
        // Yeni görevi listeye ekle
        this.tasks.push(newTask);
      }
      this.refreshList(); // Listeyi yenile
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  refreshList() {
    this.tasks = [...this.tasks]; // Listeyi yenilemek için kopyala
  }

  logout() {
    this.secureStorage.remove({ key: 'username' }).then(() => {
      this.router.navigate(['/login']);
    });
  }

  navigateToAddTask() {
    this.router.navigate(['/add-task']);
  }

  navigateToEditTask(task: Task) {
    this.router.navigate(['/edit-task', task.id]);
  }

  onItemTap(event): void {}
}
